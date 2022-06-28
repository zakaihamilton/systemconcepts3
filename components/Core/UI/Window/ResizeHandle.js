import styles from "./ResizeHandle.module.scss";
import Resize from "components/Core/Util/Resize";
import { useStateRef } from "components/Core/Util/Ref";
import Window from "components/Core/UI/Window";
import { cascade } from "components/Core/Util/Styles";
import { MdDragHandle } from 'react-icons/md';

export default function ResizeHandle({ }) {
    const ref = useStateRef();
    const window = Window.State.useState();
    const enabled = !window?.fullscreen && !window?.maximized && window?.active && (window?.resizable ?? true);
    return <>
        <div ref={ref} className={cascade(styles.root, enabled && styles.enabled)}>
            <MdDragHandle />
        </div>
        <Resize.State enabled={enabled} handle={ref?.current} />
    </>;
}
