import { useEventListener } from "components/Core/Util/EventListener";
import { createState } from "components/Core/Util/State";
import { useState, useMemo } from "react";
import { useCallback } from "react";

function checkIfStorageIsAvailable(type) {
    var storage;
    if (typeof window === "undefined") {
        return false;
    }
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export default function LocalStorage({ children }) {
    const [counter, setCounter] = useState(0);
    useEventListener(typeof window !== "undefined" && window, "storage", () => {
        setCounter(counter => counter + 1);
    }, []);
    const storageAvailable = useMemo(checkIfStorageIsAvailable, []);
    const getItem = useCallback(id => {
        if (!storageAvailable) {
            return undefined;
        }
        return localStorage.getItem(id);
    }, [storageAvailable]);
    const setItem = useCallback((id, value) => {
        if (!storageAvailable) {
            return undefined;
        }
        if (typeof value === "undefined") {
            localStorage.removeItem(id);
        }
        else {
            localStorage.setItem(id, value);
        }
        setCounter(counter => counter + 1);
    }, [storageAvailable]);
    const clear = useCallback(() => {
        if (!storageAvailable) {
            return undefined;
        }
        localStorage.clear();
        setCounter(counter => counter + 1);
    }, [storageAvailable]);
    const keys = useCallback(() => {
        if (!storageAvailable) {
            return [];
        }
        return new Array(localStorage.length).map((_, index) => localStorage.key(index));
    }, [storageAvailable]);
    return <>
        <LocalStorage.State counter={counter} getItem={getItem} setItem={setItem} clear={clear} keys={keys} storageAvailable={storageAvailable}></LocalStorage.State>
        {children}
    </>;
}

LocalStorage.State = createState("LocalStorage.State");
