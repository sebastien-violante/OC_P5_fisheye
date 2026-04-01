import { createPortal } from "react-dom";
import LightBox from "../LightBox/Lightbox";

export default function Portal({closeLightbox, picture, changePicture}) {
    if (typeof document === "undefined") return null;
    return createPortal(<LightBox closeLightbox={closeLightbox} picture={picture} changePicture={changePicture}/>, document.body)
}