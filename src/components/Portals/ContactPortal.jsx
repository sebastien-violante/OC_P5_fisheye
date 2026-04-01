import { createPortal } from "react-dom";

export default function ContactPortal() {
    if (typeof document === "undefined") return null;
    return createPortal(<ContactModal/>, document.body)
}