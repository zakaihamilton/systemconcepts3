import { useRef, useCallback } from "react";

export function useEvent(handler) {
    const handlerRef = useRef(null);

    handlerRef.current = handler;

    return useCallback((...args) => {
        const fn = handlerRef.current;
        if (typeof fn === "function") {
            return fn(...args);
        }
        return fn;
    }, []);
}
