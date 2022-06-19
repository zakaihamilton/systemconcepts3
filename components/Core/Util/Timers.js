import { useCallback, useEffect, useState } from "react";

export function useTimeout(cb, delay) {
    useEffect(() => {
        if (!cb) {
            return;
        }
        const timerHandle = setTimeout(cb, delay);
        return () => {
            clearTimeout(timerHandle);
        };
    }, [cb, delay]);
}

export function useInterval(cb, delay) {
    useEffect(() => {
        if (!cb) {
            return;
        }
        const timerHandle = setInterval(cb, delay);
        return () => {
            clearInterval(timerHandle);
        };
    }, [cb, delay]);
}

export function useDelay(value, delay) {
    const [val, setVal] = useState();
    const cb = useCallback(() => setVal(value), [value]);
    useTimeout(cb, delay);
    return val;
}

export function useEnterExit(value, enter, exit) {
    const [val, setVal] = useState();
    const cb = useCallback(() => setVal(value), [value]);
    useTimeout(value && cb, enter);
    useTimeout(!value && cb, exit);
    return val;
}

export function useIntervalCounter(delay) {
    const [counter, setCounter] = useState(0);
    const intervalCb = useCallback(() => {
        setCounter(counter => counter + 1);
    }, []);
    useInterval(intervalCb, delay);
    return counter;
}
