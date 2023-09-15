import { useState } from "preact/hooks";
import { forwardRef } from "preact/compat";
import {JSX} from "preact";
import { Spinner } from "./Spinner";
import { FrownIcon } from "../icons/FrownIcon";
import { c } from "../../utils";

export interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
    containerClassName?: string
    errorIcon?: boolean
    hideOnError?: boolean
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ containerClassName = "", onLoad, onError, errorIcon = true, hideOnError = false, children, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = useState<null | boolean>(false);

    const onImageLoad: JSX.GenericEventHandler<HTMLImageElement> = (e) => {
        setImageLoaded(true);
        onLoad?.(e);
    }

    const onImageError: JSX.GenericEventHandler<HTMLImageElement> = (e) => {
        setImageLoaded(null);
        onError?.(e);
    }

    if (imageLoaded === null && hideOnError) {
        return null;
    }

    return (
        <div className={c("relative", containerClassName)}>
            <img ref={ref} {...props} onLoad={onImageLoad} onError={onImageError} />
            {!imageLoaded && <div className={c("w-full h-full inline-flex justify-center items-center absolute top-0 transition duration-300 ease-in-out", imageLoaded === null && !errorIcon ? "bg-violet-800" : "bg-violet-800")}>
                {imageLoaded === false ? <Spinner className="w-12 h-12" /> : errorIcon && <FrownIcon className="w-12 h-12 text-violet-600" />}
            </div>}
            {children}
        </div>
    )
});