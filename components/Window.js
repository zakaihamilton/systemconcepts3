import React from "react";
import Drag from "./Util/Drag";
import { useStateRef } from "./Util/Ref";
import { createState } from "./Util/State";
import styles from "./Window.module.scss";
import Title from "./Window/Title";

export default function Window({ children }) {
    const ref = useStateRef();
    return <Drag>
        <Drag.Target target={ref?.current} />
        <div ref={ref} className={styles.root}>
            {children}
        </div>
    </Drag>;
}

Window.State = createState();
Window.Title = Title;
