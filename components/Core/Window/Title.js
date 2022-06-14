import styles from "./Title.module.scss";
import Label from "./Title/Label";
import Window from "components/Core/Window";
import { useClass } from "components/Core/Util/Styles";

export default function Title({ children }) {
    const window = Window.State.useState();
    const classes = useClass(styles.root, window?.active && styles.active, window?.fullscreen && styles.fullscreen);
    if (!children) {
        const label = window?.label || "";
        children = <Window.Title.Label>{label}</Window.Title.Label>;
    }
    return <div className={classes}>
        {children}
    </div>;
}

Title.Label = Label;