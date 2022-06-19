import Window from "../Window";

export default function WindowActive({ children }) {
    const state = Window.State.useState();

    if (!state?.active) {
        return null;
    }

    return children;
}
