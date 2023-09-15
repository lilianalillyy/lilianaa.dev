import { JSX } from "preact/jsx-runtime"

export const c = (...values: (string | (string[]) | JSX.SignalLike<string | undefined> | boolean | undefined | null)[]) => values
    .filter(v => !!v)
    .map(v => typeof v === "string" ? v : Array.isArray(v) ? v.join(" ") : String(v))
    .join(" ")

export const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(2)}`