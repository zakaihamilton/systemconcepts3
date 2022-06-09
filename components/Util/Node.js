import React, { createContext, useContext, useMemo, useEffect } from "react";

const root = new Map();
root.set("id", "root");
const Context = createContext(root);

export default function Node({ id, children }) {
    const parentNode = Node.useNode();
    const node = useMemo(() => new Map(), []);

    useMemo(() => {
        node.parent = parentNode;
        node.children = [];
        if (!parentNode.children) {
            parentNode.children = [];
        }
        parentNode.children.push(node);
    }, [node, parentNode]);

    useEffect(() => {
        return () => {
            node.parent.children = node.parent.children.filter(el => el !== node);
        };
    }, [node]);

    useMemo(() => {
        if (id) {
            node.set("id", id);
        }
        else {
            node.delete("id");
        }
    }, [node, id]);

    return <Context.Provider value={node}>
        {children}
    </Context.Provider>;
}

Node.useNode = (id) => {
    let node = useContext(Context);
    if (id) {
        while (node && node.get("id") !== id) {
            node = node.parent;
        }
    }
    return node;
};
