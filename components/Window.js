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
    const el = ref?.current;
    const window = Window.State.useState();
    const stack = Window.Stack.useInStack(el);
    const active = stack.items && stack.items[stack.items.length - 1] === el;
    const zIndex = stack.items && stack.items.findIndex(el => el === el) * 100;
    const classes = useClass(styles.root, active && styles.active, window?.fullscreen && styles.fullscreen);
    const onMouseDown = useCallback(() => {
        stack.setFocus(el);
    }, [stack, el]);
    const style = { zIndex };
    if (window) {
        if (window?.fullscreen) {
            style.left = "";
            style.top = "";
        }
        else {
            style.left = window.movableLeft + "px";
            style.top = window.movableTop + "px";
        }
    }
    useEffect(() => {
        if (el) {
            console.log("set");
            el.state = window;
            window.el = el;
        }
    }, [el, window]);
    useEffect(() => {
        if (window) {
            window.active = active;
        }
    }, [window, active]);
    const onDragging = useCallback((dragging, drag) => {
        if (window && !dragging) {
            window.movableLeft = drag.x;
            window.movableTop = drag.y;
        }
    }, [window]);
    return <Drag>
        <Drag.Target target={el} />
        <Drag.State.Notify dragging={onDragging} />
        <div ref={ref} style={style} className={classes} onMouseDown={onMouseDown}>
            {children}
        </div>
    </Drag>;
}

Window.State = createState();
Window.Title = Title;
Window.Stack = createStack();
