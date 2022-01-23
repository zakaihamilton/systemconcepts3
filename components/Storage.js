import LocalStorage from "./Storage/Local";

export default function Storage({ children }) {
    return <LocalStorage>
        {children}
    </LocalStorage>;
}
