import { HTMLAttributes } from "preact/compat";
import { c } from "../../utils";

export const FlexCentered = ({ className = "", class: _class = "", children, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={c("flex justify-center items-center", className, _class)} {...props}>
        {children}
    </div>
)