import React from "react";

function compose(props, components, children) {
    components = components.filter(([, Component]) => typeof Component === "function");
    if (!components.length) {
        return children;
    }
    return components.reduce((acc, [key, Component]) => {
        return <Component key={key} {...props}>{acc}</Component>;
    }, children);
};

export function createComponent(Component, name, options = {}) {
    let Wrapper = props => {
        props = { ...props };
        return compose(props, Object.entries(Component?.extensions || {}), <Component {...props} />);
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
    Wrapper.extend = (key, Extension) => {
        let extensions = Component.extensions;
        if (!extensions) {
            extensions = Component.extensions = {};
        }
        extensions[key] = Extension;
    };
    return Wrapper;
}
