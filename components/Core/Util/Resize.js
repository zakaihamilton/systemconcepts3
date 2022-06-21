import { createState } from "./State";
import { useCallback, useRef } from "react";
import { useEventListener } from "./EventListener";

export default function Resize() {
    const size = useRef();
    const resizeState = Resize.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const [width, height] = resizeState?.offset;
        const targetWidth = e.clientX - width;
        const targetHeight = e.clientY - height;
        size.current = { width: targetWidth, height: targetHeight };
        if (typeof resizeState.handler === "function") {
            [targetWidth, targetHeight] = resizeState.handler(targetWidth, targetHeight);
        }
        resizeState.target.style.width = targetWidth + 'px';
        resizeState.target.style.height = targetHeight + 'px';
    }, [resizeState]);
    useEventListener(resizeState?.enabled && resizeState?.target && resizeState?.handle, "mousedown", e => {
        resizeState.resizing = true;
        const targetRegion = resizeState?.target?.getBoundingClientRect();
        resizeState.offset = [e.clientX - targetRegion.width, e.clientY - targetRegion.height];
        moveTarget(e);
    }, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mousemove", moveTarget, [resizeState, moveTarget]);
    useEventListener(resizeState?.resizing && globalDocument, "mouseup", e => {
        Object.assign(resizeState, { ...size.current, resizing: false });
        moveTarget(e);
    }, [resizeState, moveTarget]);
}

Resize.State = createState("Resize.State");
