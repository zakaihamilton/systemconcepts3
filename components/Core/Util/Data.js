import { useCallback, useEffect, useState } from "react";
import Fetch from "./Fetch";
import { createState } from "./State";

export function createData(displayName, nodeId) {
    function Data({ url, options, mapping, mock, json = true, counter, ...props }) {
        const [ready, setReady] = useState();
        const [result, setResult] = useState();
        const [loading, setLoading] = useState();
        const [data, setData] = useState();
        const [mapped, setMapped] = useState(mock || {});
        const fetchData = Fetch.useFetch();
        const requestData = useCallback(async (_, params) => {
            if (!params?.url) {
                return;
            }
            setLoading(false);
            const result = await fetchData(params);
            setResult(result);
            let data = result?.json;
            setData(data);
        }, [fetchData]);

        useEffect(() => {
            const mapped = (mapping && data && mapping(data)) || data;
            setMapped(mapped);
            setReady(true);
            setLoading(true);
        }, [mapping, data]);

        return <>
            <Data.Params url={url} options={options} json={json} counter={counter} />
            <Data.Params.Counter counter={requestData} />
            <Data.Response {...result?.response} />
            <Data.Ready ready={ready} />
            <Data.Loading loading={loading} />
            <Data.State {...mapped} {...props} />
        </>;
    }
    Data.Params = createState(displayName + ".Params", nodeId);
    Data.Response = createState(displayName + ".Response", nodeId);
    Data.Ready = createState(displayName + ".Ready", nodeId);
    Data.Loading = createState(displayName + ".Loading", nodeId);
    Data.State = createState(displayName + ".State", nodeId);
    Data.useData = Data.State.useState;
    return Data;
}
