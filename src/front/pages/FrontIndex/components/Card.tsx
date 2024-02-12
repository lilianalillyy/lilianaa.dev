import { HTMLAttributes, forwardRef, useEffect, useState } from "preact/compat";
import { c } from "../../../../utils";
import { Icon } from "../../../../utils/types";

export interface CardProps {
    disableHover?: boolean;
    fadeDelay?: number;
}

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CardProps>(function Card({ className, children, fadeDelay = 0, disableHover = false, ...props }, ref) {
    const [faded, setFaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setFaded(true), fadeDelay);

        return () => {
            clearTimeout(timeout);
        }
    }, [fadeDelay, setFaded]);

    return (
        <div ref={ref} class={c("group/card h-64 w-full bg-gradient-to-br rounded-2xl shadow-2xl grid grid-rows-2 p-8 transition-all duration-500 ease-in-out-cubic", faded ? "opacity-80 dark:opcity-75" : "!opacity-0", !disableHover && "hover:opacity-100 hover:scale-90 hover:p-10", className)} {...props}>
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
            {Icon ? <Icon className={"w-16 h-16 drop-shadow-xl text-white transition-colors duration-500 delay-0 ease-in-out"} /> : null}
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
        <p ref={ref} class={"drop-shadow-xl text-2xl !text-white font-medium border-b-2 border-gray-100 transition-colors duration-500 ease-in-out"} {...props}>{children}</p>

    );
});


export const CardHeaderTag = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function CardHeaderTag({ className, children, ...props }, ref) {
    return (
        <span ref={ref} class={c("py-2 px-4 bg-white dark:bg-black text-gray-100 dark:text-gray-900 text-sm lowercase rounded-full opacity-0 group-hover/card:opacity-100 hover:!opacity-75 transition duration-500 ease-in-out", className)} {...props}>
            {children}
        </span>
    );
});

