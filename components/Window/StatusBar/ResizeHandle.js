import styles from "./ResizeHandle.module.scss";
import Resize from "components/Util/Resize";
import { useStateRef } from "components/Util/Ref";
import Window from "components/Window";
import { useClass } from "components/Util/Styles";

export default function ResizeHandle({ }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const enabled = !window?.fullscreen && window.active;
    return <Resize.Handle enabled={enabled} handle={ref?.current}>
        <div ref={ref} className={useClass(styles.root, enabled && styles.enabled)}>

        </div>
    </Resize.Handle>;
}
