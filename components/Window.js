import React, { useCallback } from "react";
import { useEffect } from "react/cjs/react.development";
import Drag from "./Util/Drag";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { useClass } from "./Util/Styles";
import styles from "./Window.module.scss";
import Title from "./Window/Title";

export default function Window({ children }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const stack = Window.Stack.useInStack(ref?.current);
    const active = stack.items[stack.items.length - 1] === ref?.current;
    const zIndex = stack.items.findIndex(el => el === ref?.current) * 100;
    const classes = useClass(styles.root, active && styles.active, window?.fullscreen && styles.fullscreen);
    const onMouseDown = useCallback(() => {
        stack.setFocus(ref?.current);
    }, [stack, ref]);
    const style = { zIndex };
    if (window?.fullscreen) {
        style.left = "";
        style.top = "";
    }
    else {
        style.left = window.movableLeft + "px";
        style.top = window.movableTop + "px";
    }
    useEffect(() => {
        window.active = active;
    }, [window, active]);
    const onDragging = useCallback((dragging, drag) => {
        if (!dragging) {
            window.movableLeft = drag.x;
            window.movableTop = drag.y;
        }
    }, [window]);
    return <Drag>
        <Drag.Target target={ref?.current} />
        <Drag.State.Notify dragging={onDragging} />
        <div ref={ref} style={style} className={classes} onMouseDown={onMouseDown}>
            {children}
        </div>
    </Drag>;
}

Window.State = createState();
Window.Title = Title;
Window.Stack = createStack();
