import { useEffect } from "react";
import { useCounter } from "./Counter";
import { createHandler } from "./Handler";
import { createState } from "./State";

export function createRequest(displayName = "", nodeId) {
    function Request(params) {
        const prepareHandlers = Request.Handler.Prepare.useHandlers();
        const fetchHandlers = Request.Handler.Fetch.useHandlers();
        const parseHandlers = Request.Handler.Parse.useHandlers();
        const counter = useCounter(Request.State);

        const callHandlers = useCallback((handlers, params) => {
            if (!handlers) {
                return;
            }
            for (const handler of handlers) {
                const result = handler(params);
                if (result) {
                    return result;
                }
            }
        }, []);

        useEffect(() => {
            callHandlers(prepareHandlers, params);
            callHandlers(fetchHandlers, params);
            callHandlers(parseHandlers, params);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [counter]);

        return <Request.State {...params} />;
    }

    const createHandlerItem = key => ({ [key]: createHandler(displayName + ".Handler." + key, nodeId) });

    Request.Handler = {
        ...createHandlerItem("Prepare"),
        ...createHandlerItem("Fetch"),
        ...createHandlerItem("Parse")
    };
    Request.State = createState(displayName + ".State", nodeId);
    Request.displayName = displayName;
    return Request;
}
