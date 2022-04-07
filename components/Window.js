import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./Window.module.scss";
import Drag from "./Util/Drag";
import Resize from "./Util/Resize";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { useClass } from "./Util/Styles";
import StatusBar from "./Window/StatusBar";
import Title from "./Window/Title";
import Desktop from "./Desktop";
import Element from "./Util/Element";
import { createComponent } from "components/Util/Component";

const Window = createComponent({ ref: true, name: "Window" }, ({ header = undefined, footer = undefined, children }) => {
    const ref = useStateRef();
    const el = ref?.current;
    const window = Window.State.useState();
    const stack = Window.Stack.useInStack(el, !window?.minimized, window?.alwaysontop);
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
    const style = useMemo(() => {
        let left, top, width, height;
        if (window && window?.fullscreen) {
            left = window.movableLeft + "px";
            top = window.movableTop + "px";
            width = window.resizableWidth + "px";
            height = window.resizableHeight + "px";
        }
        return { zIndex, left, top, width, height };
    }, [window, zIndex]);
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
        if (window) {
            const fullscreen = top < 0;
            if (!window.fullscreen !== !fullscreen) {
                window.fullscreen = top < 0;
                stack.items = [...stack.items];
            }
        }
        if (top < 0) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [window, stack]);
    return <Drag handler={dragHandler}>
        <Resize>
            <Resize.Target target={el} />
            <Drag.Target target={el} />
            <Drag.State.Notify dragging={onDragging} />
            <Resize.State.Notify resizing={onResizing} />
            <Element ref={ref} style={style} className={classes} onMouseDown={onMouseDown}>
                {header}
                <div className={styles.content}>
                    {children}
                </div>
                {footer}
            </Element>
        </Resize>
    </Drag>;
});

Window.State = createState();
Window.Stack = createStack();
Window.Title = Title;
Window.StatusBar = StatusBar;

export default Window;