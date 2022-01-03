import React, { useCallback, useEffect } from "react";
import styles from "./Window.module.scss";
import Drag from "./Util/Drag";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { useClass } from "./Util/Styles";
import StatusBar from "./Window/StatusBar";
import Title from "./Window/Title";

export default function Window({ header = undefined, footer = undefined, children }) {
    const ref = useStateRef();
    const el = ref?.current;
    const window = Window.State.useState();
    const stack = Window.Stack.useInStack(el, !window?.minimized);
    const active = stack?.focus && stack.focus[stack.focus.length - 1] === el;
    const zIndex = stack?.focus && stack.focus.findIndex(item => item === el) * 100;
    if (typeof header === "undefined") {
        header = <Window.Title />;
    }
    if (typeof footer === "undefined") {
        footer = <Window.StatusBar />;
    }
    const classes = useClass(
        styles.root,
        active && styles.active,
        window?.fullscreen && styles.fullscreen,
        window?.minimized && styles.minimized);
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
        if (el && window) {
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
            {header}
            <div className={styles.content}>
                {children}
            </div>
            {footer}
        </div>
    </Drag>;
}

Window.State = createState();
Window.Stack = createStack();
Window.Title = Title;
Window.StatusBar = StatusBar;