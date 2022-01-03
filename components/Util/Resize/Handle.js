import { useCallback, useRef } from "react";
import Resize from "../Resize";
import { useEventListener } from "../EventListener";

export default function Handle({ handle, enabled = true, children = null }) {
    const resize = useRef();
    const resizeState = Resize.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const target = resizeState?.target;
        const [left, top] = resizeState?.offset;
        if (!target) {
            return;
        }
        const targetRegion = target.getBoundingClientRect();
        const targetWidth = e.clientX - targetRegion.left + left;
        const targetHeight = e.clientY - targetRegion.top + top;
        resize.current = [targetWidth, targetHeight];
        target.style.width = targetWidth + 'px';
        target.style.height = targetHeight + 'px';
    }, [resizeState]);
    useEventListener(enabled && handle, "mousedown", e => {
        if (!resizeState) {
            return;
        }
        resizeState.resizing = true;
        const handleRegion = e.target.getBoundingClientRect();
        resizeState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        moveTarget(e);
    }, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mousemove", moveTarget, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mouseup", e => {
        Object.assign(resizeState, { width: resize.current[0], height: resize.current[1], resizing: false });
        moveTarget(e);
    }, [resizeState, moveTarget]);
    return children;
}
