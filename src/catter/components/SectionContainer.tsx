import { HTMLAttributes } from "preact/compat";
import { c } from "../../utils";

export const SectionContainer = ({ className = "", class: _class = "", children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={c("flex flex-col gap-4 pt-8", className, _class)} {...props}>
        {children}
    </div>
)