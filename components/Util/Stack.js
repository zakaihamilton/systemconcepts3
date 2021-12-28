import { useEffect } from "react";
import { createState } from "./State";

export function createStack() {
    const State = createState({ items: [] });
    State.useInStack = (el) => {
        const state = State.useState();
        useEffect(() => {
            if (!el) {
                return;
            }
            if (!state.items) {
                state.items = [el];
            }
            else {
                state.items = [...state.items, el];
            }
            return () => {
                state.items = state.items.filter(item => item !== el);
            };
        }, [state, el]);
        useEffect(() => {
            state.setFocus = el => {
                state.items = [...state.items.filter(item => item !== el), el];
            }
        }, [state]);
        return state;
    };
    return State;
}
