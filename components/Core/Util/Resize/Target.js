import { useEffect } from "react";
import Resize from "../Resize";

export default function Target({ target, children = null }) {
    const resizeState = Resize.State.useState();
    useEffect(() => {
        if (resizeState) {
            resizeState.target = target;
        }
    }, [resizeState, target]);
    return children;
}
