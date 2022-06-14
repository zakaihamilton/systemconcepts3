import styles from "./StatusBar.module.scss";
import ResizeHandle from "./StatusBar/ResizeHandle";

export default function StatusBar({ children }) {
    return <div className={styles.root}>
        <div className={styles.content}>
            {children}
        </div>
        <ResizeHandle />
    </div>;
}
