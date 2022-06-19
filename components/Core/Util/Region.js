import { useState, useEffect } from "react";
import { createState } from "./State";

export function useRegion(target) {
    const [region, setRegion] = useState();
    useEffect(() => {
        if (!target) {
            return;
        }
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setRegion(entry.contentRect);
            }
        });
        observer.observe(target);
        return () => {
            observer.unobserve(target);
        }
    }, [target]);
    return region;
}

export function createRegion(nodeId) {
    function Region({ target }) {
        const region = useRegion(target);
        return <Region.State region={region} />;
    }
    Region.State = createState("Region.State", nodeId);
    Region.useRegion = () => {
        const state = Region.State.useState();
        return state?.region;
    };
    return Region;
}
