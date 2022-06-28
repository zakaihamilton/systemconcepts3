import Move from "components/Core/Util/Move";
import React, { useCallback } from "react";

export default function WindowMove({ el, state, stack }) {
    const onMove = useCallback((_, pos) => {
        if (state) {
            state.left = pos.x;
            state.top = pos.y;
        }
    }, [state]);
    const moveHandler = useCallback((left, top) => {
        const threshold = state?.threshold || 24;
        if (state) {
            const maximized = top < threshold;
            if (!state.maximized !== !maximized) {
                state.maximized = maximized;
                stack.items = [...stack.items];
            }
        }
        if (top < threshold) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [state, stack]);
    return <>
        <Move />
        <Move.State handler={moveHandler} target={el} />
        <Move.State.Notify moving={onMove} />
    </>;
}
