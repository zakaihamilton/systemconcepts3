import { cascade } from "./Styles";
import React from "react";
import { createComponent } from "./Component";

const Element = createComponent(({ children, className, style, el, ...props }) => {
    style = style || {};
    className = cascade(className);
    return <div ref={el} className={className} style={style} {...props}>
        {children}
    </div>;
}, "Element", { ref: "el" });

export default Element;