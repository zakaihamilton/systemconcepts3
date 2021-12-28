import { useCallback, useRef } from "react";
import Drag from "../Drag";
import { useEventListener } from "../EventListener";

export default function Handle({ handle, enabled = true, children = null }) {
    const pos = useRef();
    const dragState = Drag.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const target = dragState?.target;
        const [left, top] = dragState?.offset;
        if (!target) {
            return;
        }
        const targetLeft = e.clientX - left;
        const targetTop = e.clientY - top;
        pos.current = [targetLeft, targetTop];
        target.style.left = targetLeft + 'px';
        target.style.top = targetTop + 'px';
    }, [dragState]);
    useEventListener(enabled && handle, "mousedown", e => {
        dragState.dragging = true;
        const handleRegion = e.target.getBoundingClientRect();
        dragState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        moveTarget(e);
    }, [dragState, moveTarget]);
    useEventListener(dragState.dragging && globalDocument, "mousemove", moveTarget, [dragState, moveTarget]);
    useEventListener(dragState.dragging && globalDocument, "mouseup", e => {
        Object.assign(dragState, { dragging: false, x: pos.current[0], y: pos.current[1] });
        moveTarget(e);
    }, [dragState, moveTarget]);
    return children;
}
