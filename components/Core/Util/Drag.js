import { useState } from "react";
import { useEventListener } from "./EventListener";

export default function useElementDrag(element, onDrag, depends = []) {
    const [isDragging, setDragging] = useState(false);
    const globalDocument = typeof document !== "undefined" && document;
    const handler = (e) => {
        if (typeof onDrag === "function") {
            setDragging(!!onDrag(e));
        }
    };
    useEventListener(onDrag && element, "mousedown", handler, depends);
    useEventListener(isDragging && globalDocument, "mousemove", handler, depends);
    useEventListener(isDragging && globalDocument, "mouseup", handler, depends);
    return isDragging;
}
