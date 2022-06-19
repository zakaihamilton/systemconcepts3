import styles from "./Item.module.scss";
import { cascade } from "components/Core/Util/Styles";
import Label from "./Item/Label";
import { createState, useStateFromObject } from "components/Core/Util/State";

export default function TaskbarItem({ }) {
    const state = TaskbarItem.State.useState();
    useStateFromObject(state?.window);
    return <div className={cascade(styles.root, state?.window?.active && styles.active)}>
        <Label>
            {state?.window?.label}
        </Label>
    </div>;
}

TaskbarItem.Label = Label;
TaskbarItem.State = createState("TaskbarItem.State");
