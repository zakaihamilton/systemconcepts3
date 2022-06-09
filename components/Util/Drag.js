import React from "react";
import Handle from "./Drag/Handle";
import Target from "./Drag/Target";
import { createState } from "./State";

export default function Drag({ children, ...state }) {
    return <Drag.State {...state}>
        {children}
    </Drag.State>;
}

Drag.State = createState("Drag.State");
Drag.Handle = Handle;
Drag.Target = Target;
