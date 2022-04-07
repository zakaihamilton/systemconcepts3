import React from "react";

export function createComponent(options, Component) {
    options = options || {};
    const name = options.name || Component.name || Component.displayName;
    let Wrapper = props => {
        props = { ...props };
        const { extensions = [] } = Component || {};
        for (const extension of extensions) {
            const result = extension(props);
            if (result) {
                Object.assign(props, result);
            }
        }
        return <Component {...props} />;
    };
    if (options.ref) {
        const Source = Wrapper;
        const ForwardComponent = (props, ref) => {
            return Source({ ...props, [options.ref]: ref });
        };
        Wrapper = React.forwardRef(ForwardComponent);
        Wrapper.displayName = name;
    }
    Wrapper.displayName = name;
    Wrapper.extendComponent = Extension => {
        const extensions = Component.extensions || [];
        Component.extensions = [...extensions, Extension];
    };
    return Wrapper;
}
