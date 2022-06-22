import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./Window.module.scss";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { cascade } from "./Util/Styles";
import StatusBar from "./Window/StatusBar";
import Title from "./Window/Title";
import Desktop from "./Desktop";
import Element from "./Util/Element";
import { createComponent } from "components/Core/Util/Component";
import WindowDrag from "./Window/Drag";
import WindowResize from "./Window/Resize";
import WindowActive from "./Window/Active";
import { createRegion } from "./Util/Region";
import ResizeHandle from "./Window/ResizeHandle";

const Window = createComponent(({ children }) => {
    const windowRef = useStateRef();
    const contentRef = useStateRef();
    const el = windowRef?.current;
    const state = Window.State.useState();
    const region = Desktop.Region.useRegion();
    const stack = Window.Stack.useInStack(el, !state?.minimized, state?.alwaysontop);
    const active = stack?.focus && stack.focus[stack.focus.length - 1] === el;
    const zIndex = stack?.focus && stack.focus.findIndex(item => item === el) * 100;
    let header = null, footer = null;
    if (typeof state?.header === "undefined") {
        header = <Window.Title />;
    }
    else {
        header = state?.header;
    }
    const classes = cascade(
        styles.root,
        active && styles.active,
        state?.fullscreen && styles.fullscreen,
        state?.maximized && styles.maximized,
        state?.minimized && styles.minimized,
        state?.center && styles.center,
        !region && state?.center && styles.hidden);
    const onMouseDown = useCallback(() => {
        if (!active) {
            stack?.setFocus(el);
        }
    }, [stack, el, active]);
    const style = useMemo(() => {
        let left = "0", top = "0", width = "initial", height = "initial";
        if (state?.center && region) {
            left = "50%";
            top = "50%";
        }
        else if (!state?.fullscreen && !state?.maximized) {
            left = state.left;
            top = state.top;
            width = state.width;
            height = state.height;
        }
        return { zIndex, left, top, width, height };
    }, [state?.fullscreen, state?.center, state?.maximized, state.left, state.top, state.width, state.height, zIndex, region]);
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
    return <>
        <WindowDrag state={state} stack={stack} el={el} />
        <WindowResize state={state} el={el} />
        <Element ref={windowRef} style={style} className={classes} onMouseDown={onMouseDown}>
            {header}
            <div ref={contentRef} className={styles.content}>
                {children}
            </div>
            <Window.Region target={contentRef?.current} />
            {state?.footer}
            <ResizeHandle />
        </Element>
    </>;
}, "Window");

Window.State = createState("Window.State");
Window.Stack = createStack("Window.Stack", "root");
Window.Title = Title;
Window.StatusBar = StatusBar;
Window.Active = WindowActive;
Window.Region = createRegion();

export default Window;