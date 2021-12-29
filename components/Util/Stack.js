import { useEffect } from "react";
import { createState } from "./State";

export function createStack() {
    const State = createState();
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
                if (!el) {
                    return;
                }
                if (state.items[state.items.length - 1] !== el) {
                    state.items = [...state.items.filter(item => item !== el), el];
                }
            }
        }, [state]);
        return state;
    };
    return State;
}
