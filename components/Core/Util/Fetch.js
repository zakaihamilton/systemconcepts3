import { useCallback } from "react";
import { useEvent } from "./Event";
import { createHandler } from "./Handler";
import { createState } from "./State";

const Fetch = createState("Fetch", "root");
Fetch.Prepare = createHandler();
Fetch.Parse = createHandler();
Fetch.useFetch = () => {
    const prepareHandlers = Fetch.Prepare.useHandlers();
    const parseHandlers = Fetch.Parse.useHandlers();

    const callHandlers = useCallback(async (handlers, params) => {
        if (!handlers) {
            return;
        }
        for (const handler of handlers) {
            const result = await handler(params);
            if (result) {
                return result;
            }
        }
    }, []);

    const fetchData = useEvent(async params => {
        params = JSON.parse(JSON.stringify(params));
        if (!params.url) {
            return;
        }
        let error = await callHandlers(prepareHandlers, params);
        if (error) {
            console.error("failed to prepare", params);
            return;
        }
        let response = null;
        const { url, options } = params;
        try {
            response = await fetch(url, options);
        }
        catch (err) {
            console.error("fetch err", err, url);
        }
        let text = null, json = null;
        if (response?.status >= 200 && response?.status <= 400) {
            text = await response.text();
        }
        if (params?.json && text) {
            try {
                json = JSON.parse(text);
            } catch (err) {
                console.error("parse err", err, data);
            }
        }
        const parseObject = {
            response,
            url,
            options,
            json,
            text
        };
        error = await callHandlers(parseHandlers, parseObject);
        if (error) {
            console.error("parse error", error);
            return;
        }
        return parseObject;
    });

    return fetchData;
};

export default Fetch;
