import { useState } from "react";
import { useEventListener } from "./EventListener.js";

export function useSize() {
    const isClient = !(typeof window === "undefined");
    const [size, setSize] = useState([isClient && window.innerWidth, isClient && window.innerHeight]);
    useEventListener(isClient && window, "resize", () => {
        setSize([window.innerWidth, window.innerHeight]);
    }, []);
    return size;
}
