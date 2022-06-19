import React, { useEffect, useRef, useState, useCallback } from "react";
import { createState } from "./State";
import { getConfig } from "components/Core/Util/Config";
import Auth from "components/Data/Auth";

export async function fetchData(url, options = {}, parse = true) {
    let data = null, response = null;
    try {
        const config = getConfig();
        const { userId } = Auth.getGlobalAuth() || {};
        const port = null;
        const basePort = config?.apiBasePort;
        const baseUrl = config?.apiBasePath;
        const baseSuffix = (port || basePort) ? ":" + (port || basePort) : "";
        const remoteUrl = url.startsWith("http") || url.startsWith("api/") ? url : baseUrl + baseSuffix + url;
        options = options || {};
        if (options.headers) {
            options.headers = { ...options.headers };
        } else {
            options.headers = {};
        }
        options.cors = "cors";
        options.credentials = "include";
        if (userId) {
            options.headers["x-user"] = userId;
        }
        Object.assign(options.headers, { "Access-Control-Allow-Origin": "*" });
        response = await fetch(remoteUrl, options);
        if (response?.status >= 200 && response?.status <= 400) {
            data = await response.text();
        }
    } catch (err) {
        console.error("fetch err", err, data);
    }
    try {
        if (data && parse) {
            data = JSON.parse(data);
        }
    } catch (err) {
        console.error("parse err", err, data);
    }
    return [data, response];
}

export function useData({ url, options, mapping, queue, cache, counter = 0 }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [mapped, setMapped] = useState(null);
    const availableRef = useRef(true);
    const mapData = useCallback((data, mapping) => {
        return new Promise((resolve) => {
            if (mapping && data) {
                const result = mapping(data);
                if (result?.then) {
                    result.then(mapped => {
                        resolve(mapped);
                    });
                } else {
                    resolve(result);
                }
            } else {
                resolve(data);
            }
        });
    }, []);
    useEffect(() => {
        setData(null);
        setMapped(null);
        setValid(false);
        if (!url) {
            return;
        }
        setLoading(true);
        availableRef.current = true;
        let promise = null;
        if (cache?.urlData && cache?.urlData[url]) {
            promise = cache.urlData[url];
        } else {
            promise = fetchData(url, options);
            if (cache) {
                if (!cache.urlData) {
                    cache.urlData = {};
                }
                cache.urlData[url] = promise;
            }
        }
        if (queue) {
            if (!queue.items) {
                queue.items = [];
            }
            queue.items = [...queue.items, promise];
        }
        Promise.allSettled(queue?.items || []).then(() => {
            promise.then(data => {
                if (!availableRef.current) {
                    return;
                }
                setData(data[0]);
                mapData(data[0], mapping).then(mapped => {
                    setMapped(mapped);
                    setValid(true);
                    setLoading(false);
                });
            }).catch(() => {
                setData(null);
                setLoading(false);
            });
        });
        return () => {
            availableRef.current = false;
        };
    }, [url, options, counter]);
    useEffect(() => {
        mapData(data, mapping).then(mapped => {
            setMapped(mapped);
        });
    }, [mapping]);
    return [mapped, loading, valid];
}

export function createData(displayName, nodeId) {
    function Data({ url, options, mapping, counter, ...props }) {
        const queue = Data.Queue.useState();
        const cache = Data.Cache.useState();
        const [data, loading, valid] = useData({ url, options, mapping, queue, cache, counter });
        const dataProps = typeof data === "object" ? data : {};

        return <Data.State {...props} {...dataProps} loading={loading} valid={valid} />;
    }

    Data.State = createState(displayName, nodeId);
    Data.Children = Data.State.Children;
    Data.useData = Data.State.useState;
    Data.Queue = createState();
    Data.Cache = createState();

    return Data;
}
