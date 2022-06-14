import { useMemo } from "react";
import styles from "./Taskbar.module.scss";
import TaskbarItem from "./Taskbar/Item";
import Node from "./Util/Node";
import Window from "./Window";

export default function Taskbar({ children = null }) {
    const stack = Window.Stack.useState();
    const items = useMemo(() => {
        return stack?.items?.map((el, idx) => {
            return <Node key={idx}>
                <TaskbarItem.State window={el.state} />
                <TaskbarItem />
            </Node>
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
        <div className={styles.items}>
            {items}
        </div>
    </div>;
}
