export const c = (...values: (string | (string[]) | boolean | undefined | null)[]) => values
    .filter(v => !!v)
    .map(v => typeof v === "string" ? v : Array.isArray(v) ? v.join(" ") : String(v))
    .join(" ")