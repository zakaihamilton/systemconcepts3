import React, { useCallback } from "react";
import Drag from "./Util/Drag";
import { useStateRef } from "./Util/Ref";
import { createStack } from "./Util/Stack";
import { createState } from "./Util/State";
import { useClass } from "./Util/Styles";
import styles from "./Window.module.scss";
import Title from "./Window/Title";

export default function Window({ children }) {
    const ref = useStateRef();
    const stack = Window.Stack.useInStack(ref?.current);
    const active = stack.items[stack.items.length - 1] === ref?.current;
    const zIndex = stack.items.findIndex(el => el === ref?.current) * 100;
    const classes = useClass(styles.root, active && styles.active);
    const onMouseDown = useCallback(() => {
        stack.setFocus(ref?.current);
    }, [stack, ref]);
    const style = { zIndex };
    return <Drag>
        <Drag.Target target={ref?.current} />
        <Window.State active={active}>
            <div ref={ref} style={style} className={classes} onMouseDown={onMouseDown}>
                {children}
            </div>
        </Window.State>
    </Drag>;
}

Window.State = createState();
Window.Title = Title;
Window.Stack = createStack();
