import { createState } from "./State";
import { useRef } from "react";
import useElementDrag from "./Drag";

export default function Resize() {
    const size = useRef();
    const state = Resize.State.useState();
    useElementDrag(state?.enabled && state?.target && state?.handle, e => {
        if (e.type === "mousedown") {
            state.resizing = true;
            const targetRegion = state?.target?.getBoundingClientRect();
            state.offset = [e.clientX - targetRegion.width, e.clientY - targetRegion.height];
        } else if (e.type === "mouseup") {
            Object.assign(state, { ...size.current, resizing: false });
        }
        const [width, height] = state?.offset;
        let targetWidth = e.clientX - width;
        let targetHeight = e.clientY - height;
        if (typeof state.handler === "function") {
            [targetWidth, targetHeight] = state.handler(targetWidth, targetHeight);
        }
        size.current = { width: targetWidth, height: targetHeight };
        state.target.style.width = targetWidth + 'px';
        state.target.style.height = targetHeight + 'px';
        return e.type !== "mouseup";
    }, [state]);
}

Resize.State = createState("Resize.State");
