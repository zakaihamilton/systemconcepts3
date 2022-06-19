import { useEffect } from "react";

export function createStorage(State) {
    function StorageState({ id, load, save }) {
        const object = State.useState();
        useEffect(() => {
            if (!load || !object) {
                return;
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
        }, [load, id, object]);
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
    };
    return StorageState;
}
