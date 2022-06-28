import styles from "./Title.module.scss";
import Label from "./Title/Label";
import Window from "components/Core/UI/Window";
import { cascade } from "components/Core/Util/Styles";

export default function Title({ children }) {
    const window = Window.State.useState();
    const classes = cascade(
        styles.root,
        window?.active && styles.active,
        window?.maximized && styles.maximized,
        window?.fullscreen && styles.fullscreen
    );
    if (!children) {
        const label = window?.label || "";
        children = <Window.Title.Label>{label}</Window.Title.Label>;
    }
    return <div className={classes}>
        {children}
    </div>;
}

Title.Label = Label;
