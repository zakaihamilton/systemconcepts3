import { useCallback } from "react";
import styles from "./Label.module.scss";
import Window from "components/Window";
import TaskbarItem from "../Item";

export default function Label({ children }) {
    const stack = Window.Stack.useState();
    const state = TaskbarItem.State.useState();
    const onClick = useCallback(() => {
        if (state?.window?.active) {
            state.window.minimized = true;
        }
        else {
            state.window.minimized = false;
            stack.setFocus(state?.window?.el);
        }
    }, [stack, state?.window]);
    return <div onClick={onClick} className={styles.root}>
        <div className={styles.label}>
            {children}
        </div>
    </div>
}