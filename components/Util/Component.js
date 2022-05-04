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
        const { propExtensions = [], componentExtensions = {} } = Component || {};
        for (const extension of propExtensions) {
            const result = extension(props);
            if (result) {
                Object.assign(props, result);
            }
        }
        return compose(props, Object.entries(componentExtensions), <Component {...props} />);
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
    Wrapper.extendProps = Extension => {
        const extensions = Component.propExtensions || [];
        Component.propExtensions = [...extensions, Extension];
    };
    Wrapper.extendComponent = (key, Extension) => {
        let extensions = Component.componentExtensions;
        if (!extensions) {
            extensions = Component.componentExtensions = {};
        }
        extensions[key] = Extension;
    };
    return Wrapper;
}
