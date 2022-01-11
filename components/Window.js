import React, { useCallback, useEffect } from "react";
import styles from "./Window.module.scss";
import Drag from "./Util/Drag";
import Resize from "./Util/Resize";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { useClass } from "./Util/Styles";
import StatusBar from "./Window/StatusBar";
import Title from "./Window/Title";
import { useSize } from "./Util/Size";
import Desktop from "./Desktop";

export default function Window({ header = undefined, footer = undefined, children }) {
    const ref = useStateRef();
    const el = ref?.current;
    const window = Window.State.useState();
    const stack = Window.Stack.useInStack(el, !window?.minimized);
    const active = stack?.focus && stack.focus[stack.focus.length - 1] === el;
    const zIndex = stack?.focus && stack.focus.findIndex(item => item === el) * 100;
    const region = Desktop.Region.useRegion();
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
        stack?.setFocus(el);
    }, [stack, el]);
    const style = { zIndex };
    if (window) {
        if (window?.fullscreen) {
            style.left = "";
            style.top = "";
            style.width = "";
            style.height = "";
        }
        else {
            style.left = window.movableLeft + "px";
            style.top = window.movableTop + "px";
            style.width = window.resizableWidth + "px";
            style.height = window.resizableHeight + "px";
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
    useEffect(() => {
        if (window?.center && region) {
            const margin = 60;
            window.movableLeft = margin;
            window.movableTop = margin;
            window.resizableWidth = region.width - (margin * 2);
            window.resizableHeight = region.height - (margin * 2);
        }
    }, [region, window, window?.center]);
    const onDragging = useCallback((dragging, drag) => {
        if (window && !dragging) {
            window.movableLeft = drag.x;
            window.movableTop = drag.y;
            window.center = false;
        }
    }, [window]);
    const onResizing = useCallback((resizing, resize) => {
        if (window && !resizing) {
            window.resizableWidth = resize.width;
            window.resizableHeight = resize.height;
            window.center = false;
        }
    }, [window]);
    const dragHandler = useCallback((left, top) => {
        window.fullscreen = top < 0;
        if (top < 0) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [window]);
    return <Drag handler={dragHandler}>
        <Resize>
            <Resize.Target target={el} />
            <Drag.Target target={el} />
            <Drag.State.Notify dragging={onDragging} />
            <Resize.State.Notify resizing={onResizing} />
            <div ref={ref} style={style} className={classes} onMouseDown={onMouseDown}>
                {header}
                <div className={styles.content}>
                    {children}
                </div>
                {footer}
            </div>
        </Resize>
    </Drag>;
}

Window.State = createState();
Window.Stack = createStack();
Window.Title = Title;
Window.StatusBar = StatusBar;
