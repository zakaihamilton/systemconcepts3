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

const Window = createComponent({ name: "Window" }, ({ state, region, header = undefined, footer = undefined, children }) => {
    const ref = useStateRef();
    const el = ref?.current;
    const stack = Window.Stack.useInStack(el, !state?.minimized, state?.alwaysontop);
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
        state?.fullscreen && styles.fullscreen,
        state?.minimized && styles.minimized);
    const onMouseDown = useCallback(() => {
        stack?.setFocus(el);
    }, [stack, el]);
    const style = useMemo(() => {
        let left = "0", top = "0", width = "initial", height = "initial";
        if (!state?.fullscreen) {
            left = state.movableLeft + "px";
            top = state.movableTop + "px";
            width = state.resizableWidth + "px";
            height = state.resizableHeight + "px";
        }
        return { zIndex, left, top, width, height };
    }, [state?.fullscreen, state.movableLeft, state.movableTop, state.resizableWidth, state.resizableHeight, zIndex]);
    useEffect(() => {
        if (el && state) {
            el.state = state;
            state.el = el;
        }
    }, [el, state]);
    useEffect(() => {
        if (state) {
            state.active = active;
        }
    }, [state, active]);
    useEffect(() => {
        if (state?.center && region) {
            const margin = 60;
            state.movableLeft = margin;
            state.movableTop = margin;
            state.resizableWidth = region.width - (margin * 2);
            state.resizableHeight = region.height - (margin * 2);
        }
    }, [region, state, state?.center]);
    const onDragging = useCallback((dragging, drag) => {
        if (state && !dragging) {
            state.movableLeft = drag.x;
            state.movableTop = drag.y;
            state.center = false;
        }
    }, [state]);
    const onResizing = useCallback((resizing, resize) => {
        if (state && !resizing) {
            state.resizableWidth = resize.width;
            state.resizableHeight = resize.height;
            state.center = false;
        }
    }, [state]);
    const dragHandler = useCallback((left, top) => {
        if (state) {
            const fullscreen = top < 0;
            if (!state.fullscreen !== !fullscreen) {
                state.fullscreen = top < 0;
                stack.items = [...stack.items];
            }
        }
        if (top < 0) {
            top = 0;
            left = 0;
        }
        return [left, top];
    }, [state, stack]);
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
Window.extendProps(() => ({
    state: Window.State.useState(),
    region: Desktop.Region.useRegion()
}));

export default Window;