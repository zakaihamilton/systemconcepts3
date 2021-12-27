import { useContext, useEffect } from "react";

export default function InitState({ ...props }) {
    const context = useContext(Context);
    const keys = Object.keys(props);
    const values = Object.values(props);
    useEffect(() => {
        const { proxy } = context || ref.current || {};
        keys.forEach(key => {
            props[key](proxy[key]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...keys, ...values]);
    return null;
}
