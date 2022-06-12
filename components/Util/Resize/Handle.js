import { useCallback, useRef } from "react";
import Resize from "../Resize";
import { useEventListener } from "../EventListener";

export default function Handle({ handle, enabled = true, children = null }) {
    const size = useRef();
    const resizeState = Resize.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const target = resizeState?.target;
        const [width, height] = resizeState?.offset;
        if (!target) {
            return;
        }
        const targetWidth = e.clientX - width;
        const targetHeight = e.clientY - height;
        size.current = [targetWidth, targetHeight];
        if (typeof resizeState.handler === "function") {
            [targetWidth, targetHeight] = resizeState.handler(targetWidth, targetHeight);
        }
        target.style.width = targetWidth + 'px';
        target.style.height = targetHeight + 'px';
    }, [resizeState]);
    useEventListener(enabled && handle, "mousedown", e => {
        if (!resizeState) {
            return;
        }
        resizeState.resizing = true;
        const handleRegion = e.target.getBoundingClientRect();
        const targetRegion = resizeState?.target.getBoundingClientRect();
        resizeState.offset = [e.clientX - targetRegion.width + 1, e.clientY - targetRegion.height + 1];
        moveTarget(e);
    }, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mousemove", moveTarget, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mouseup", e => {
        Object.assign(resizeState, { width: size.current[0], height: size.current[1], resizing: false });
        moveTarget(e);
    }, [resizeState, moveTarget]);
    return children;
}
