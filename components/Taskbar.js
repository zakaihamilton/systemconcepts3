import styles from "./Taskbar.module.scss";

export default function Taskbar({ children = null }) {
    return <div className={styles.root}>
        {children}
    </div>;
}
