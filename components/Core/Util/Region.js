import { useState, useEffect, useMemo } from "react";
import { createState } from "./State";

export function useRegion(target) {
    const [counter, setCounter] = useState(0);
    const region = useMemo(() => target && target.getBoundingClientRect(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [target, counter]);
    useEffect(() => {
        if (!target) {
            return;
        }
        const observer = new ResizeObserver(() => setCounter(counter => counter + 1));
        observer.observe(target);
        return () => {
            observer.unobserve(target);
        }
    }, [target]);
    return region;
}

export function createRegion() {
    function Region({ target }) {
        const region = useRegion(target);
        return <Region.State region={region} />;
    }
    Region.State = createState("Region.State");
    Region.useRegion = () => {
        const state = Region.State.useState();
        return state?.region;
    };
    return Region;
}
