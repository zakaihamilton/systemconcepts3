import { useEffect } from "react";
import { createState } from "./State";

export function createStack() {
    const State = createState();
    State.useInStack = (el) => {
        const state = State.useState();
        useEffect(() => {
            if (!el || !state) {
                return;
            }
            if (!state.items) {
                state.items = [el];
                state.focus = [el];
            }
            else {
                state.items = [...state.items, el];
                state.focus = [...state.focus, el];
            }
            return () => {
                state.items = state.items.filter(item => item !== el);
                state.focus = state.focus.filter(item => item !== el);
            };
        }, [state, el]);
        useEffect(() => {
            if (!state) {
                return;
            }
            state.setFocus = el => {
                if (!el) {
                    return;
                }
                if (state.focus[state.focus.length - 1] !== el) {
                    state.focus = [...state.focus.filter(item => item !== el), el];
                }
            }
        }, [state]);
        return state;
    };
    return State;
}
