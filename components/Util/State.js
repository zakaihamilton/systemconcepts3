import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { objectHasChanged, createObjectProxy } from "./Object";
import { createInit } from "./State/Init";
import { createNotify } from "./State/Notify";
import { createStorage } from "./State/Storage";

export function createState(props) {
    const hasProps = typeof props === "object";
    const object = hasProps && createObjectProxy(props) || [];
    const Context = createContext(hasProps && object);

    function State({ children, ...props }) {
        const [updatedProps, setUpdatedProps] = useState({ ...props });
        const stateRef = useRef(null);
        const valueChanged = stateRef.current && objectHasChanged(props, updatedProps);
        const changeRef = useRef(0);
        if (!stateRef.current) {
            const object = createObjectProxy(props);
            stateRef.current = object;
        }
        if (valueChanged) {
            changeRef.current++;
        }
        useEffect(() => {
            if (!changeRef.current) {
                return;
            }
            setUpdatedProps({ ...props });
            Object.assign(stateRef.current, props);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [changeRef.current]);
        return <Context.Provider value={stateRef.current}>
            {children}
        </Context.Provider>;
    }
    State.useState = (selector) => {
        const [, setCounter] = useState(0);
        const context = useContext(Context);
        const object = context || null;
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
            return () => {
                object.__unregister(handler);
            };
        }, [object, selector]);
        return object;
    };
    State.Init = createInit(Context);
    State.Notify = createNotify(Context);
    State.Storage = createStorage(Context);
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
