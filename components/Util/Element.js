import { useClass } from "./Styles";
import React from "react";
import { createComponent } from "./Component";

const Element = createComponent({ ref: true, name: "Element" }, ({ children, className, style, ref, ...props }) => {
    style = style || {};
    className = useClass(className);
    return <div ref={ref} className={className} style={style} {...props}>
        {children}
    </div>;
});

export default Element;