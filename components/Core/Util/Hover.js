import { useState, useEffect } from "react";

export function useHover(ref) {
    const [state, setState] = useState({ hover: false, active: false });

    const handleMouseOver = () => setState(state => ({ ...state, hover: true }));
    const handleMouseOut = () => setState(state => ({ ...state, hover: false }));
    const handleMouseDown = () => setState(state => ({ ...state, active: true }));
    const handleMouseUp = () => setState(state => ({ ...state, active: false }));

    const node = ref?.current;
    useEffect(() => {
        if (node) {
            node.addEventListener('mousedown', handleMouseDown);
            document.body.addEventListener('mouseup', handleMouseUp);
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);

            return () => {
                node.removeEventListener('mousedown', handleMouseDown);
                document.body.removeEventListener('mouseup', handleMouseUp);
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);

                setState({ hover: false, active: false });
            };
        }
    }, [node]);

    return [state?.hover, state?.hover && state?.active];
}
