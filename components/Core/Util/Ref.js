import { useCallback, useState } from "react";

export function useStateRef() {
    const [node, setNode] = useState(null);
    const callback = useCallback(node => {
        setNode(node);
    }, []);
    callback.current = node;
    return callback;
}
