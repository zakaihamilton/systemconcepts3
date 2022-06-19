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
        if (state) {
            const maximized = top < 50;
            if (!state.maximized !== !maximized) {
                state.maximized = maximized;
                stack.items = [...stack.items];
            }
        }
        if (top < 50) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [state, stack]);
    return <>
        <Drag handler={dragHandler} />
        <Drag.Target target={el} />
        <Drag.State.Notify dragging={onDragging} />
    </>;
}
