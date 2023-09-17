import { useEffect } from "preact/hooks";
import { fullName, nickname } from "../utils/constants";

export const useTitle = (pageTitle?: string, name = nickname) => {
    const title = `${pageTitle?.length ? pageTitle : fullName} • ${name}`;

    useEffect(() => {
        document.title = title;

        return () => {
            document.title = name;
        }
    }, [title]);

    return title;
}