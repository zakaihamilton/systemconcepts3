import { createState } from "./State";
import { useRef } from "react";
import useElementDrag from "./Drag";

export default function Resize() {
    const size = useRef();
    const resizeState = Resize.State.useState();
    useElementDrag(resizeState?.enabled && resizeState?.target && resizeState?.handle, e => {
        if (e.type === "mousedown") {
            resizeState.resizing = true;
            const targetRegion = resizeState?.target?.getBoundingClientRect();
            resizeState.offset = [e.clientX - targetRegion.width, e.clientY - targetRegion.height];
        } else if (e.type === "mouseup") {
            Object.assign(resizeState, { ...size.current, resizing: false });
        }
        const [width, height] = resizeState?.offset;
        let targetWidth = e.clientX - width;
        let targetHeight = e.clientY - height;
        if (typeof resizeState.handler === "function") {
            [targetWidth, targetHeight] = resizeState.handler(targetWidth, targetHeight);
        }
        size.current = { width: targetWidth, height: targetHeight };
        resizeState.target.style.width = targetWidth + 'px';
        resizeState.target.style.height = targetHeight + 'px';
        return e.type !== "mouseup";
    }, [resizeState]);
}

Resize.State = createState("Resize.State");
