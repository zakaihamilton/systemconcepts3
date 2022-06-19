import React from "react";
import Handle from "./Resize/Handle";
import Target from "./Resize/Target";
import { createState } from "./State";

export default function Resize({ ...state }) {
    return <Resize.State {...state} />;
}

Resize.State = createState("Resize.State");
Resize.Handle = Handle;
Resize.Target = Target;
