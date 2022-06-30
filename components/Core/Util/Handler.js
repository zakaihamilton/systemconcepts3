import { useEffect } from "react";

export function createHandler(displayName, nodeId) {
    function Handler({ children, handler }) {
        const node = Node.useNode(nodeId);
        let handlers = node.get(Handler);
        if (!handlers) {
            handlers = [];
            node.set(Handler, handlers);
        }
        useEffect(() => {
            if (!handler) {
                return;
            }
            handlers.push(handler);
            return () => {
                const index = handlers.findIndex(el => el === handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            };
        }, [handlers, handler]);
        return children;
    }
    Handler.useHandlers = () => {
        const node = Node.useNode(nodeId);
        let handlers = node.get(Handler);
        return handlers;
    };
    Handler.displayName = displayName;
    return Handler;
}
