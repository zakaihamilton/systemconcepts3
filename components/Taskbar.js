import { useMemo } from "react";
import styles from "./Taskbar.module.scss";
import TaskbarItem from "./Taskbar/Item";
import Window from "./Window";

export default function Taskbar({ children = null }) {
    const stack = Window.Stack.useState();
    const items = useMemo(() => {
        return stack?.items?.map((el, idx) => {
            return <TaskbarItem.State key={idx} window={el.state}>
                <TaskbarItem />
            </TaskbarItem.State>
        });
    }, [stack?.items]);
    if (stack?.items?.length === 1) {
        const window = stack.items[0].state;
        if (window.fullscreen && !window.minimized) {
            return null;
        }
    }
    return <div className={styles.root}>
        {children}
        {items}
    </div>;
}
