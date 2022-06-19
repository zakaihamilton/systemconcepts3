import { useMemo } from "react";
import styles from "./Taskbar.module.scss";
import TaskbarItem from "./Taskbar/Item";
import Node from "./Util/Node";
import Window from "./Window";

export default function Taskbar({ children = null }) {
    const stack = Window.Stack.useState();
    const items = useMemo(() => {
        return stack?.items?.map((el, idx) => {
            const window = el.state;
            if (typeof window.taskbar !== "undefined" && !window.taskbar) {
                return null;
            }
            return <Node key={idx}>
                <TaskbarItem.State window={window} />
                <TaskbarItem />
            </Node>
        }).filter(Boolean);
    }, [stack?.items]);
    if (stack?.items?.length === 1) {
        const window = stack.items[0].state;
        if ((window.fullscreen || window.maximized) && !window.minimized) {
            return null;
        }
    }
    return <div className={styles.root}>
        {children}
        <div className={styles.items}>
            {items}
        </div>
    </div>;
}
