import { createState } from "./State";
import { useRef } from "react";
import useElementDrag from "./Drag";

export default function Move() {
    const pos = useRef();
    const state = Move.State.useState();
    useElementDrag(state?.enabled && state?.target && state?.handle, e => {
        if (e.type === "mousedown") {
            state.moving = true;
            const targetRegion = state?.target?.getBoundingClientRect();
            state.offset = [e.clientX - targetRegion.left, e.clientY - targetRegion.top];
        } else if (e.type === "mouseup") {
            Object.assign(state, { ...pos.current, moving: false });
        }
        const [left, top] = state?.offset;
        let targetLeft = e.clientX - left;
        let targetTop = e.clientY - top;
        if (typeof state.handler === "function") {
            [targetLeft, targetTop] = state.handler(targetLeft, targetTop);
        }
        pos.current = { left: targetLeft, top: targetTop };
        state.target.style.left = targetLeft + 'px';
        state.target.style.top = targetTop + 'px';
        return e.type !== "mouseup";
    }, [state]);
}

Move.State = createState("Move.State");
