import { useEffect } from "react";

export function useEventListener(target, type, listener, depends = [], options = {}) {
    useEffect(() => {
        if (!target) {
            return;
        }
        target.addEventListener(type, listener, options);
        return () => {
            target.removeEventListener(type, listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, type, ...depends]);
}
