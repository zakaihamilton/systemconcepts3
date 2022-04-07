import { useClass } from "./Styles";
import React from "react";
import { createComponent } from "./Component";

const Element = createComponent({ ref: "el", name: "Element" }, ({ children, className, style, el, ...props }) => {
    style = style || {};
    className = useClass(className);
    return <div ref={el} className={className} style={style} {...props}>
        {children}
    </div>;
});

export default Element;