import { useContext, useEffect } from "react";

export default function NotifyState({ ...props }) {
    const context = useContext(Context);
    const keys = Object.keys(props);
    const values = Object.values(props);
    useEffect(() => {
        const callbacks = context?.callbacks;
        const update = (method, target, key) => {
            if (props[key]) {
                const value = context?.proxy[key];
                props[key](value);
            }
        };
        if (callbacks) {
            callbacks.push(update);
        }
        return () => {
            if (callbacks) {
                callbacks.remove(update);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...keys, ...values]);
    return null;
};
