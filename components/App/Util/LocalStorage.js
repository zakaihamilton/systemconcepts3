import React from "react";
import Window from "components/Core/UI/Window"

export default function AppLocalStorage({ }) {
    return <>
        <Window.State label="Local Storage" fullscreen />
        <Window>
            <Window.Region  />
        </Window>
    </>
}
