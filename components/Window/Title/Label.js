import React from "react";
import Drag from "components/Util/Drag";
import styles from "./Label.module.scss";
import { useStateRef } from "components/Util/Ref";
import Window from "components/Window";
import { useClass } from "components/Util/Styles";
import { useEffect } from "react";

export default function Label({ children }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const classes = useClass(styles.root, window?.active && styles.active);
    useEffect(() => {
        if (window) {
            window.label = String(children);
        }
    }, [window, children]);
    return <Drag.Handle handle={ref?.current}>
        <div ref={ref} className={classes}>
            {children}
        </div>
    </Drag.Handle>;
}
