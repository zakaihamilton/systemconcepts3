import React from "react";
import Handle from "./Resize/Handle";
import Target from "./Resize/Target";
import { createState } from "./State";

export default function Resize({ children }) {
    return <Resize.State>
        {children}
    </Resize.State>;
}

Resize.State = createState("Resize.State");
Resize.Handle = Handle;
Resize.Target = Target;
