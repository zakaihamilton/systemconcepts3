import { useEffect } from "react";
import Node from "../Node";

export function createInit(State, nodeId) {
    function InitState({ ...props }) {
        const node = Node.useNode(nodeId, State);
        const object = node.get(State);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            if (!object) {
                return;
            }
            keys.forEach(key => {
                props[key](object[key]);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [object, ...keys, ...values]);
        return null;
    }
    return InitState;
}