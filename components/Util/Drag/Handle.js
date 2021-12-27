import { useCallback } from "react";
import Drag from "../Drag";
import { useEventListener } from "../EventListener";

export default function Handle({ handle, children = null }) {
    const dragState = Drag.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const target = dragState?.target;
        const [left, top] = dragState?.offset;
        if (!target) {
            return;
        }
        target.style.left = e.clientX - left + 'px';
        target.style.top = e.clientY - top + 'px';
    }, [dragState]);
    useEventListener(handle, "mousedown", e => {
        dragState.dragging = true;
        const handleRegion = e.target.getBoundingClientRect();
        dragState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        moveTarget(e);
    }, [dragState, moveTarget]);
    useEventListener(dragState.dragging && globalDocument, "mousemove", moveTarget, [dragState, moveTarget]);
    useEventListener(dragState.dragging && globalDocument, "mouseup", e => {
        dragState.dragging = false;
        moveTarget(e);
    }, [dragState, moveTarget]);
    return children;
}
