import styles from "./StatusBar.module.scss";

export default function StatusBar({ children }) {
    return <div className={styles.root}>
        {children}
    </div>;
}
