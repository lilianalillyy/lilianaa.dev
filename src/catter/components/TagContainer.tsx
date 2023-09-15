import { HTMLAttributes } from "preact/compat";
import { c } from "../../utils";

export const TagContainer = ({ className = "", class: _class = "", children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={c("flex gap-2 flex-wrap items-center justify-start", className, _class)} {...props}>
        {children}
    </div>
)