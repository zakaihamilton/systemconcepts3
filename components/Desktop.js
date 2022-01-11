import styles from "./Desktop.module.scss";
import { useStateRef } from "./Util/Ref";
import { createRegion } from "./Util/Region";

export default function Desktop({ children }) {
    const ref = useStateRef();
    return <Desktop.Region target={ref?.current}>
        <div ref={ref} className={styles.root}>
            {children}
        </div>
    </Desktop.Region>;
}

Desktop.Region = createRegion();
