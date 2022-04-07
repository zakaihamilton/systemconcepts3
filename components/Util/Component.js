import React from "react";

export function createComponent(options, Component) {
    if (options.ref) {
        const Source = Component;
        const name = options.name || Component.name || Component.displayName;
        const ForwardComponent = (props, ref) => {
            return Source({ ...props, ref });
        };
        Component = React.forwardRef(ForwardComponent);
        Component.displayName = name;
    }
    return Component;
}
