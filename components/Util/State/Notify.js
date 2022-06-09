import { useEffect } from "react";
import Node from "../Node";

export function createNotify(State, nodeId) {
    function NotifyState({ ...props }) {
        const node = Node.useNode(nodeId);
        const object = node.get(State);
        const keys = Object.keys(props);
        const values = Object.values(props);
        useEffect(() => {
            const update = (method, target, key) => {
                if (props[key]) {
                    const value = object[key];
                    props[key](value, object);
                }
            };
            if (object) {
                object.__register(update);
            }
            return () => {
                if (object) {
                    object.__register(update);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...keys, ...values]);
        return null;
    };
    return NotifyState;
}
