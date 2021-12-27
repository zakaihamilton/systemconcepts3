import { useEffect, useRef } from "react";

export function objectHasChanged(a, b) {
    a = a || {};
    b = b || {};
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    let changed = aKeys.some((_, idx) => bKeys[idx] !== aKeys[idx]);
    changed = changed || aKeys.some(key => !Object.is(a[key], b[key]));
    return changed;
}

export function createObjectProxy(props) {
    const callbacks = [];
    const forward = (method, ...args) => {
        const result = Reflect[method](...args);
        callbacks && callbacks.forEach(cb => cb(method, ...args));
        return result;
    }
    const proxy = new Proxy({ ...props }, {
        set: function (target, key, value) {
            if (target[key] === value) {
                return true;
            }
            return forward("set", target, key, value);
        },
        deleteProperty: function (target, key) {
            if (!(key in target)) {
                return true;
            }
            return forward("deleteProperty", target, key);
        },
        defineProperty: function (target, prop, descriptor) {
            return forward("defineProperty", target, prop, descriptor);
        }
    });
    callbacks.remove = cb => {
        const index = callbacks.indexOf(cb);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    };
    return [proxy, callbacks];
}

export function useObject(object) {
    const ref = useRef({ ...object });
    useEffect(() => {
        const hasChanged = objectHasChanged(ref.current, object);
        if (hasChanged) {
            ref.current = { ...object };
        }
    });
    return ref.current;
}

export function cleanObject(object) {
    return Object.fromEntries(Object.entries(object).filter(([_, val]) => typeof val !== "undefined"));
}