import { useCallback } from "react";
import styles from "./Label.module.scss";
import Window from "components/Core/UI/Window";
import TaskbarItem from "../Item";
import { cascade } from "components/Core/Util/Styles";

export default function Label({ children }) {
    const stack = Window.Stack.useState();
    const state = TaskbarItem.State.useState();
    const active = state?.window?.active;
    const onClick = useCallback(() => {
        if (state?.window?.active) {
            state.window.minimized = true;
        }
        else {
            state.window.minimized = false;
            stack?.setFocus(state?.window?.el);
        }
    }, [stack, state?.window]);
    return <div onClick={onClick} className={cascade(styles.root, active && styles.active)}>
        <div className={cascade(styles.label, active && styles.active)}>
            {children}
        </div>
    </div>
}