import styles from "./Item.module.scss";
import { useClass } from "components/Util/Styles";
import Label from "./Item/Label";
import { createState, useStateFromObject } from "components/Util/State";

export default function TaskbarItem({ }) {
    const state = TaskbarItem.State.useState();
    useStateFromObject(state?.window);
    return <div className={useClass(styles.root, state?.window?.active && styles.active)}>
        <Label>
            {state?.window?.label}
        </Label>
    </div>;
}

TaskbarItem.Label = Label;
TaskbarItem.State = createState("TaskbarItem.State");
