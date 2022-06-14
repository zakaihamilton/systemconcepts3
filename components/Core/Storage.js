import LocalStorage from "components/Storage/Local";

export default function Storage({ children }) {
    return <LocalStorage>
        {children}
    </LocalStorage>;
}
