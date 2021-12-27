import React from "react";
import Drag from "components/Util/Drag";
import styles from "./Label.module.scss";
import { useStateRef } from "components/Util/Ref";

export default function Label({ children }) {
    const ref = useStateRef();
    return <Drag.Handle handle={ref?.current}>
        <div ref={ref} className={styles.root}>
            {children}
        </div>
    </Drag.Handle>;
}
