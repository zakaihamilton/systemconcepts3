import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { objectHasChanged, createObjectProxy } from "./Object";
import { createInit } from "./State/Init";
import { createNotify } from "./State/Notify";
import { createStorage } from "./State/Storage";

export function createState(props) {
    const hasProps = typeof props === "object";
    const [proxy, callbacks] = hasProps && createObjectProxy(props) || [];
    const Context = createContext(hasProps && { proxy, callbacks });

    function State({ children, ...props }) {
        const [updatedProps, setUpdatedProps] = useState({ ...props });
        const stateRef = useRef({ proxy: null, callbacks: [] });
        const valueChanged = stateRef.current.proxy && objectHasChanged(props, updatedProps);
        const changeRef = useRef(0);
        if (!stateRef.current.proxy) {
            const [proxy, callbacks] = createObjectProxy(props);
            stateRef.current.proxy = proxy;
            stateRef.current.callbacks = callbacks;
        }
        if (valueChanged) {
            changeRef.current++;
        }
        useEffect(() => {
            if (!changeRef.current) {
                return;
            }
            setUpdatedProps({ ...props });
            Object.assign(stateRef.current.proxy, { ...props });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [changeRef.current]);
        return <Context.Provider value={stateRef.current}>
            {children}
        </Context.Provider>;
    }
    State.useState = (selector) => {
        const [, setCounter] = useState(0);
        const ref = useRef();
        const context = useContext(Context);
        const { proxy, callbacks } = context || ref.current || {};
        useEffect(() => {
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
                        const keys = Object.keys(proxy);
                        if (!selector(proxy)) {
                            return;
                        }
                    }
                }
                setCounter(counter => counter + 1);
            };
            if (callbacks) {
                callbacks.push(handler);
            }
            return () => {
                if (callbacks) {
                    callbacks.remove(handler);
                }
            };
        }, [callbacks, proxy, selector]);
        return proxy;
    };
    State.Init = createInit(Context);
    State.Notify = createNotify(Context);
    State.Storage = createStorage(Context);
    return State;
}

export function useStateFromObject(object) {
    const [, setCounter] = useState(0);
    const callbacks = object?.__callbacks;
    useEffect(() => {
        const handler = () => {
            setCounter(counter => counter + 1);
        };
        if (callbacks) {
            callbacks.push(handler);
        }
        handler();
        return () => {
            if (callbacks) {
                callbacks.remove(handler);
            }
        };
    }, [callbacks]);
    return object;
};
