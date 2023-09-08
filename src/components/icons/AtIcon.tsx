import { JSX } from "preact";

export const AtIcon = (props: JSX.SVGAttributes<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        {...props}
    >
        <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="4" />
        <path xmlns="http://www.w3.org/2000/svg" d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
    </svg>
)