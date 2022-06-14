import Drag from "components/Core/Util/Drag";
import React, { useCallback } from "react";

export default function WindowDrag({ children, el, state, stack }) {
    const onDragging = useCallback((dragging, drag) => {
        if (state && !dragging) {
            state.movableLeft = drag.x;
            state.movableTop = drag.y;
            state.center = false;
        }
    }, [state]);
    const dragHandler = useCallback((left, top) => {
        if (state) {
            const fullscreen = top < 0;
            if (!state.fullscreen !== !fullscreen) {
                state.fullscreen = top < 0;
                stack.items = [...stack.items];
            }
        }
        if (top < 0) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [state, stack]);
    return <>
        <Drag handler={dragHandler} />
        <Drag.Target target={el} />
        <Drag.State.Notify dragging={onDragging} />
        {children}
    </>;
}
