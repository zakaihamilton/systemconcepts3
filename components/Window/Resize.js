import Resize from "components/Util/Resize";
import React, { useCallback } from "react";

export default function WindowResize({ children, state, el }) {
    const onResizing = useCallback((resizing, resize) => {
        if (state && !resizing) {
            state.resizableWidth = resize.width;
            state.resizableHeight = resize.height;
            state.center = false;
        }
    }, [state]);

    return <Resize>
        <Resize.Target target={el} />
        <Resize.State.Notify resizing={onResizing} />
        {children}
    </Resize>;
}
