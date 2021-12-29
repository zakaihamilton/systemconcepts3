import { useCallback } from "react/cjs/react.development";
import styles from "./Label.module.scss";
import Window from "components/Window";
import TaskbarItem from "../Item";

export default function Label({ children }) {
    const stack = Window.Stack.useState();
    const state = TaskbarItem.State.useState();
    const onClick = useCallback(() => {
        stack.setFocus(state?.window?.el);
    }, [stack, state?.window?.el]);
    return <div onClick={onClick} className={styles.root}>
        <div className={styles.label}>
            {children}
        </div>
    </div>
}