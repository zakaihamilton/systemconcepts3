import { useCallback, useRef } from "react";

export function useBatch() {
    const timerRef = useRef();
    const batch = useCallback(cb => {
        setTimeout(() => {
            timerRef.current = null;
            cb && cb();
        }, 0);
    }, []);

    return batch;
}
