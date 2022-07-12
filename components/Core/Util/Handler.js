import { useCounter } from "./State/Counter";
import { createState } from "./State";
import { useMemo } from "react";

export function createHandler(displayName, nodeId) {
    const State = createState(displayName, nodeId);
    State.useHandlers = () => {
        const state = State.usePassiveState();
        const counter = useCounter(State);
        const handlers = useMemo(() => {
            return Object.values(state || {});
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [counter]);
        return handlers;
    };
    return State;
}
