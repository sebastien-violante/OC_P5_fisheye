import { createPortal } from "react-dom";
import ContactModal from "../ContactModal/ContactModal";

export default function ContactPortal({name, closeForm, formOpen}) {
    if (typeof document === "undefined") return null;
    return createPortal(<ContactModal name={name} closeForm={closeForm} formOpen={formOpen}/>, document.body)
}