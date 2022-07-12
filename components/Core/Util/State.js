import { useState, useRef, useEffect } from "react";
import Node from "./Node";
import { objectHasChanged, createObjectProxy } from "./Object";
import { createChildren } from "./State/Children";
import { createCounter } from "./State/Counter";
import { createInit } from "./State/Init";
import { createNotify } from "./State/Notify";
import { createStorage } from "./State/Storage";

export function createState(displayName, baseNodeId) {
    function State({ children, ...props }) {
        const node = Node.useNode(baseNodeId);
        let object = node.get(State);
        const [updatedProps, setUpdatedProps] = useState({ ...props });
        const valueChanged = object && objectHasChanged(props, updatedProps);
        const changeRef = useRef(0);
        if (!object) {
            object = createObjectProxy(props);
            node.set(State, object);
        }
        else if (!changeRef.current) {
            changeRef.current++;
        }
        if (valueChanged) {
            changeRef.current++;
        }
        useEffect(() => {
            if (!changeRef.current) {
                return;
            }
            setUpdatedProps({ ...props });
            Object.assign(object, props);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [changeRef.current]);
        return children;
    }
    State.usePassiveState = (nodeId) => {
        const node = Node.useNode(nodeId || baseNodeId, State);
        const object = node && node.get(State);
        return object;
    };
    State.useState = (selector, nodeId) => {
        const [, setCounter] = useState(0);
        const node = Node.useNode(nodeId || baseNodeId, State);
        const object = node && node.get(State);
        useEffect(() => {
            if (!object) {
                return;
            }
            const handler = (_, key) => {
                if (selector) {
                    if (typeof selector === "object") {
                        if (Array.isArray(selector)) {
                            if (!selector.includes(key)) {
                                return;
                            }
                        }
                        else {
                            if (!selector[key]) {
                                return;
                            }
                        }
                    }
                    else if (typeof selector === "function") {
                        if (!selector(key)) {
                            return;
                        }
                    }
                }
                setCounter(counter => counter + 1);
            };
            object.__register(handler);
            setCounter(counter => counter + 1);
            return () => {
                object.__unregister(handler);
            };
        }, [object, selector]);
        return object;
    };
    State.Init = createInit(State);
    State.Notify = createNotify(State);
    State.Storage = createStorage(State);
    State.Children = createChildren(State);
    State.Counter = createCounter(State);
    State.displayName = displayName;
    return State;
}

export function useStateFromObject(object) {
    const [, setCounter] = useState(0);
    useEffect(() => {
        const handler = () => {
            setCounter(counter => counter + 1);
        };
        if (object) {
            object.__register(handler);
        }
        handler();
        return () => {
            if (object) {
                object.__unregister(handler);
            }
        };
    }, [object]);
    return object;
};
