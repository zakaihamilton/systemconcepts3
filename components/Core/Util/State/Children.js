export function createChildren(State) {
    function ChildrenState({ children }) {
        const object = State.useState();
        if (typeof children !== "function") {
            return;
        }
        return children(object);
    }
    return ChildrenState;
}
