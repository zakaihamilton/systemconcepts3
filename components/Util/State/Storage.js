import { useContext, useEffect } from "react";


export function createStorage(Context) {
    function StorageState({ id, load, save, children }) {
        const object = useContext(Context);
        useEffect(() => {
            if (!load) {
                return null;
            }
            const result = load(id);
            if (result?.then) {
                result.then(data => {
                    if (typeof data === "object") {
                        Object.assign(object, data);
                    }
                });
            } else if (result) {
                Object.assign(object, result);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [load, id]);
        useEffect(() => {
            const saveValues = () => {
                save(id, object);
            };
            if (save && object) {
                object.__register(saveValues);
            }
            return () => {
                if (object) {
                    object.__unregister(saveValues);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps            
        }, [save, id]);
        return children || null;
    };
    return StorageState;
}
