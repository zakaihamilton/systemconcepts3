import { useClass } from "./Styles";
import React from "react";

const Element = React.forwardRef(
    function Element({ children, className, style, ...props }, ref) {
        style = style || {};
        className = useClass(className);
        return <div ref={ref} className={className} style={style} {...props}>
            {children}
        </div>;
    }
);

export default Element;