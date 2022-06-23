import { createState } from "./State";
import { useRef } from "react";
import useElementDrag from "./Drag";

export default function Move() {
    const pos = useRef();
    const moveState = Move.State.useState();
    useElementDrag(moveState?.enabled && moveState?.handle, e => {
        console.log("e", e);
        if (e.type === "mousedown") {
            moveState.moving = true;
            const handleRegion = e.target.getBoundingClientRect();
            moveState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        }
        else if (e.type === "mouseup") {
            Object.assign(moveState, { ...pos.current, moving: false });
        }
        const [left, top] = moveState?.offset;
        let targetLeft = e.clientX - left;
        let targetTop = e.clientY - top;
        if (typeof moveState.handler === "function") {
            [targetLeft, targetTop] = moveState.handler(targetLeft, targetTop);
        }
        pos.current = { width: targetLeft, height: targetTop };
        moveState.target.style.left = targetLeft + 'px';
        moveState.target.style.top = targetTop + 'px';
        return e.type !== "mouseup";
    }, [moveState]);
}

Move.State = createState("Move.State");
