import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { objectHasChanged, createObjectProxy } from "./Object";
import InitState from "./State/Init";
import NotifyState from "./State/Notify";
import StorageState from "./State/Storage";

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
    State.useState = (defaultState) => {
        const [, setCounter] = useState(0);
        const ref = useRef();
        const context = useContext(Context);
        if (!context && defaultState && !ref.current) {
            const [proxy, callbacks] = createObjectProxy(defaultState);
            ref.current = { proxy, callbacks };
        }
        const { proxy, callbacks } = context || ref.current || {};
        useEffect(() => {
            const handler = () => {
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
        }, [callbacks]);
        return proxy;
    };
    State.Init = InitState;
    State.Notify = NotifyState;
    State.Storage = StorageState;
    return State;
}
