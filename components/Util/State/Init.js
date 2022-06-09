import { useContext, useEffect } from "react";

export function createInit(Context) {
    function InitState({ ...props }) {
        const object = useContext(Context);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            if (!object) {
                return;
            }
            keys.forEach(key => {
                props[key](object[key]);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [object, ...keys, ...values]);
        return null;
    }
    return InitState;
}