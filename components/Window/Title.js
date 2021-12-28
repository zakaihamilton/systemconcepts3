import styles from "./Title.module.scss";
import Label from "./Title/Label";
import Window from "components/Window";
import { useClass } from "components/Util/Styles";

export default function Title({ children }) {
    const window = Window.State.useState();
    const classes = useClass(styles.root, window?.active && styles.active);
    return <div className={classes}>
        {children}
    </div>;
}

Title.Label = Label;