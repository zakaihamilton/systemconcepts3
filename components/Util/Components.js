import React from "react";

export default function Components({ children }) {
    const components = React.Children.toArray(children);
    return [...elements].reverse().reduce((acc, child) => {
        const children = child.props.children || [];
        return React.cloneElement(child, child.props, [children, acc].filter(Boolean));
    }, components);
}
