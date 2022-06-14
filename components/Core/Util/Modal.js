import ReactDOM from "react-dom"
import { useEffect, useState } from "react"

export default function Modal({ children, visible = true }) {
    const [element, setElement] = useState(null);
    useEffect(() => {
        if (!visible) {
            return;
        }
        let modalRoot = document.getElementById('modal-root');
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';
            document.body.appendChild(modalRoot);
        }
        const element = document.createElement('div');
        setElement(element);
        modalRoot.appendChild(element);
        return () => {
            modalRoot.removeChild(element);
            setElement(null);
        };
    }, [visible]);
    return element && ReactDOM.createPortal && ReactDOM.createPortal(
        children,
        element
    ) || null;
}
