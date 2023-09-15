import { JSX } from "preact";

export const FrownIcon = (props: JSX.SVGAttributes<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        {...props}
    >
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
        <line x1="10" y1="10" x2="9.01" y2="9"/>
        <line x1="14" y1="10" x2="15.01" y2="9"/>
    </svg>
)