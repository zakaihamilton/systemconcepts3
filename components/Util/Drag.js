import React from "react";
import Handle from "./Drag/Handle";
import Target from "./Drag/Target";
import { createState } from "./State";

export default function Drag({ children }) {
    return <Drag.State>
        {children}
    </Drag.State>;
}

Drag.State = createState();
Drag.Handle = Handle;
Drag.Target = Target;
