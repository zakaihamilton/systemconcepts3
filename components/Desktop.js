import styles from "./Desktop.module.scss";
import { useStateRef } from "./Util/Ref";
import { createRegion } from "./Util/Region";

export default function Desktop({ children }) {
    const ref = useStateRef();
    return <div ref={ref} className={styles.root}>
        <Desktop.Region target={ref?.current} />
        {children}
    </div>;
}

Desktop.Region = createRegion();
