import { createState } from "./State";
import React, { useCallback } from "react";
import LocalStorage from "components/Storage/Local";

export default function DarkMode() {
    const localStorage = LocalStorage.State.useState();
    const loadState = useCallback(() => {
        const mode = localStorage.getItem("dark-mode") || "light";
        document.documentElement.setAttribute("data-dark-mode", mode);
        return { mode };
    }, [localStorage]);
    const saveState = useCallback(() => {
        const mode = document.documentElement.getAttribute("data-dark-mode");
        localStorage.setItem("dark-mode", mode);
    }, [localStorage]);
    const applyMode = useCallback(mode => {
        document.documentElement.setAttribute("data-dark-mode", mode);
    }, []);
    return <>
        <DarkMode.State />
        <DarkMode.State.Notify mode={applyMode} />
        <DarkMode.State.Storage load={loadState} save={saveState} />
    </>;
}

DarkMode.State = createState("DarkMode.State", "root");
