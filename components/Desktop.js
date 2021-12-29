import styles from "./Desktop.module.scss";

export default function Desktop({ children }) {
    return <div className={styles.root}>
        {children}
    </div>
}