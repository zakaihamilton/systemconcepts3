import { useContext, useEffect } from "react";

export default function StorageState({ id, load, save, children }) {
    const context = useContext(Context);
    useEffect(() => {
        if (!load) {
            return null;
        }
        const result = load(id);
        if (result?.then) {
            result.then(data => {
                if (typeof data === "object") {
                    Object.assign(context?.proxy, data);
                }
            });
        } else if (result) {
            Object.assign(context?.proxy, result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load, id]);
    useEffect(() => {
        const saveValues = () => {
            save(id, context?.proxy);
        };
        const callbacks = context?.callbacks;
        if (save && callbacks) {
            callbacks.push(saveValues);
        }
        return () => {
            if (callbacks) {
                callbacks.remove(saveValues);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps            
    }, [save, id]);
    return children || null;
};
