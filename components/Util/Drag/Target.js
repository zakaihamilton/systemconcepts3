import React, { useEffect } from "react";
import Drag from "../Drag";

export default function Target({ target, children = null }) {
    const dragState = Drag.State.useState();
    useEffect(() => {
        dragState.target = target;
    }, [dragState, target]);
    return children;
}
