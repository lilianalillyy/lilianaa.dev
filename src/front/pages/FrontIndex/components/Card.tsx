import { HTMLAttributes, forwardRef } from "preact/compat";
import { c } from "../../../../utils";
import { Icon } from "../../../../utils/types";

export interface CardProps {
    disableHover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CardProps>(function Card({ className, children, disableHover = false, ...props }, ref) {
    return (
        <div ref={ref} class={c("group/card h-64 w-full bg-gradient-to-br opacity-75 rounded-2xl shadow-2xl grid grid-rows-2 p-8 transition-all duration-500 ease-in-out-cubic", !disableHover && "hover:opacity-100 hover:scale-90 hover:p-10", className)} {...props}>
            {children}
        </div>
    );
})

export interface CardHeaderProps {
    Icon?: Icon;
}

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CardHeaderProps>(function CardHeader({ className, Icon, children, ...props }, ref) {
    return (
        <div ref={ref} className={c("inline-flex justify-between items-start", className)} {...props}>
            {Icon ? <Icon className={"w-16 h-16 drop-shadow-xl"} /> : null}
            {children}
        </div>
    );
});

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent({ className, children, ...props }, ref) {
    return (
        <div ref={ref} class={c("inline-flex items-end justify-end", className)} {...props}>
            {children}
        </div>
    );
});

export const CardSocialText = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardContent({ className, children, ...props }, ref) {
    return (
        <p ref={ref} class={"drop-shadow-xl text-2xl font-medium border-b-2"} {...props}>{children}</p>

    );
});


export const CardHeaderTag = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function CardHeaderTag({ className, children, ...props }, ref) {
    return (
        <span ref={ref} class={c("py-2 px-4 bg-white text-gray-900 text-sm lowercase rounded-full opacity-0 group-hover/card:opacity-100 hover:!opacity-75 transition duration-500 ease-in-out", className)} {...props}>
            {children}
        </span>
    );
});

