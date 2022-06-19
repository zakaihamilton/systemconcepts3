import Node from "../Node";

export function createChildren(State) {
    function ChildrenState({ children, ...fields }) {
        const object = State.useState();
        children = [...children || []];
        for (const key in fields) {
            const cb = fields[key];
            if (typeof cb === "function") {
                const result = cb(object[key]);
                if (result) {
                    children.push(result);
                }
            }
        }
        return children;
    }
    return ChildrenState;
}
