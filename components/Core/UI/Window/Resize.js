import Resize from "components/Core/Util/Resize";
import React, { useCallback } from "react";

export default function WindowResize({ state, el }) {
    const onResizing = useCallback((resizing, resize) => {
        if (state && !resizing) {
            state.width = resize.width;
            state.height = resize.height;
        }
    }, [state]);

    return <>
        <Resize />
        <Resize.State target={el} />
        <Resize.State.Notify resizing={onResizing} />
    </>;
}
