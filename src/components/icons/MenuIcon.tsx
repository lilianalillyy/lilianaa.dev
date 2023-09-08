import {JSX} from "preact";

export const MenuIcon = (props: JSX.SVGAttributes<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        {...props}
    >
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="4" y1="6" x2="21" y2="6" />
        <line x1="12" y1="18" x2="21" y2="18" />
    </svg>
)