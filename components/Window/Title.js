import styles from "./Title.module.scss";
import Label from "./Title/Label";

export default function Title({ children }) {
    return <div className={styles.root}>
        {children}
    </div>;
}

Title.Label = Label;