import { useState, useEffect } from "react";
import { createState } from "./State";

export function useRegion(target) {
    const [region, setRegion] = useState();
    useEffect(() => {
        if (!target || !cb) {
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

export function createRegion() {
    function Region({ target, children = null }) {
        const state = Region.State.useState({});
        useEffect(() => {
            if (!target) {
                return;
            }
            const observer = new ResizeObserver(entries => {
                for (let entry of entries) {
                    state.region = entry.contentRect;
                }
            });
            observer.observe(target);
            return () => {
                observer.unobserve(target);
            }
        }, [target, state]);
        return children;
    }
    Region.State = createState();
    Region.useRegion = () => {
        const state = Region.State.useState();
        return state?.region;
    };
    return Region;
}
