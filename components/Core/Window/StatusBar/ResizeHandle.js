import styles from "./ResizeHandle.module.scss";
import Resize from "components/Core/Util/Resize";
import { useStateRef } from "components/Core/Util/Ref";
import Window from "components/Core/Window";
import { cascade } from "components/Core/Util/Styles";
import { MdDragHandle } from 'react-icons/md';

export default function ResizeHandle({ }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const enabled = !window?.fullscreen && !window?.maximized && window?.active;
    return <Resize.Handle enabled={enabled} handle={ref?.current}>
        <div ref={ref} className={cascade(styles.root, enabled && styles.enabled)}>
            <MdDragHandle />
        </div>
    </Resize.Handle>;
}
