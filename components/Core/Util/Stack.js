import { useEffect } from "react";
import { createState } from "./State";

export function createStack(displayName, nodeId) {
    const State = createState(displayName, nodeId);
    State.useInStack = (el, focusable) => {
        const state = State.useState();
        useEffect(() => {
            if (!el || !state) {
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
            if (!el || !state) {
                return;
            }
            if (!state.focus) {
                state.focus = [el];
            }
            else {
                state.focus = [...state.focus, focusable && el].filter(Boolean);
            }
            return () => {
                state.focus = state.focus.filter(item => item !== el);
            };
        }, [state, el, focusable]);
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
