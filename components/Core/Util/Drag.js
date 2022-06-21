import { createState } from "./State";
import { useCallback, useRef } from "react";
import { useEventListener } from "./EventListener";

export default function Drag() {
    const pos = useRef();
    const dragState = Drag.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const [left, top] = dragState?.offset;
        const targetLeft = e.clientX - left;
        const targetTop = e.clientY - top;
        pos.current = { width: targetLeft, height: targetTop };
        if (typeof dragState.handler === "function") {
            [targetLeft, targetTop] = dragState.handler(targetLeft, targetTop);
        }
        dragState.target.style.left = targetLeft + 'px';
        dragState.target.style.top = targetTop + 'px';
    }, [dragState]);
    useEventListener(dragState?.enabled && dragState?.handle, "mousedown", e => {
        dragState.dragging = true;
        const handleRegion = e.target.getBoundingClientRect();
        dragState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        moveTarget(e);
    }, [dragState, moveTarget]);
    useEventListener(dragState?.dragging && globalDocument, "mousemove", moveTarget, [dragState, moveTarget]);
    useEventListener(dragState?.dragging && globalDocument, "mouseup", e => {
        Object.assign(dragState, { ...pos.current, dragging: false });
        moveTarget(e);
    }, [dragState, moveTarget]);
}

Drag.State = createState("Drag.State");
