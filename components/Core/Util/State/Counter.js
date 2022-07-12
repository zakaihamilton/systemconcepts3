import { useEffect, useState } from "react";
import { useBatch } from "../Batch";

export function useCounter(State) {
    const [counter, setCounter] = useState(0);
    const object = State?.usePassiveState();
    const batch = useBatch();
    useEffect(() => {
        const update = (method, target, key) => {
            batch(() => setCounter(counter => counter + 1));
        };
        if (object) {
            object.__register(update);
        }
        return () => {
            if (object) {
                object.__register(update);
            }
        };
    }, [object, batch]);

    return counter;
}

export function createCounter(State) {
    function CounterState({ counter }) {
        const object = State?.usePassiveState();
        const counterNum = useCounter(State);
        useEffect(() => {
            counter && counter(counterNum, object);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [counterNum]);
        return null;
    };
    return CounterState;
}
