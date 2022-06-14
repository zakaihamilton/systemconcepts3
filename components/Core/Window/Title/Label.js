import React from "react";
import Drag from "components/Core/Util/Drag";
import styles from "./Label.module.scss";
import { useStateRef } from "components/Core/Util/Ref";
import Window from "components/Core/Window";
import { useClass } from "components/Core/Util/Styles";
import { useEffect } from "react";

export default function Label({ children }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const classes = useClass(styles.root,
        window?.active && styles.active,
        window?.fullscreen && styles.fullscreen,
        window?.modal && styles.modal);
    useEffect(() => {
        if (window) {
            window.label = String(children);
        }
    }, [window, children]);
    return <Drag.Handle handle={ref?.current} enabled={!window?.modal}>
        <div ref={ref} className={classes}>
            {children}
        </div>
    </Drag.Handle>;
}
