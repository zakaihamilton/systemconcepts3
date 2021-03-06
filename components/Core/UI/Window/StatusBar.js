import { cascade } from "components/Core/Util/Styles";
import Window from "../Window";
import styles from "./StatusBar.module.scss";

export default function StatusBar({ children }) {
    const window = Window.State.useState();
    const classes = cascade(
        styles.root,
        window?.active && styles.active,
        window?.maximized && styles.maximized,
        window?.fullscreen && styles.fullscreen
    );
    return <div className={classes}>
        <div className={styles.content}>
            {children}
        </div>
    </div>;
}
