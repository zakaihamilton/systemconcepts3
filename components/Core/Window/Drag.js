import Drag from "components/Core/Util/Drag";
import React, { useCallback } from "react";

export default function WindowDrag({ el, state, stack }) {
    const onDragging = useCallback((_, drag) => {
        if (state) {
            state.left = drag.x;
            state.top = drag.y;
        }
    }, [state]);
    const dragHandler = useCallback((left, top) => {
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
        <Drag />
        <Drag.State handler={dragHandler} target={el} />
        <Drag.State.Notify dragging={onDragging} />
    </>;
}
