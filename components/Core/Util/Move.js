import { createState } from "./State";
import { useCallback, useRef } from "react";
import { useEventListener } from "./EventListener";

export default function Move() {
    const pos = useRef();
    const moveState = Move.State.useState();
    const globalDocument = typeof document !== "undefined" && document;
    const moveTarget = useCallback(e => {
        const [left, top] = moveState?.offset;
        const targetLeft = e.clientX - left;
        const targetTop = e.clientY - top;
        pos.current = { width: targetLeft, height: targetTop };
        if (typeof moveState.handler === "function") {
            [targetLeft, targetTop] = moveState.handler(targetLeft, targetTop);
        }
        moveState.target.style.left = targetLeft + 'px';
        moveState.target.style.top = targetTop + 'px';
    }, [moveState]);
    useEventListener(moveState?.enabled && moveState?.handle, "mousedown", e => {
        moveState.moving = true;
        const handleRegion = e.target.getBoundingClientRect();
        moveState.offset = [e.clientX - handleRegion.left + 1, e.clientY - handleRegion.top + 1];
        moveTarget(e);
    }, [moveState, moveTarget]);
    useEventListener(moveState?.moving && globalDocument, "mousemove", moveTarget, [moveState, moveTarget]);
    useEventListener(moveState?.moving && globalDocument, "mouseup", e => {
        Object.assign(moveState, { ...pos.current, moving: false });
        moveTarget(e);
    }, [moveState, moveTarget]);
}

Move.State = createState("Move.State");
