import { useParams } from "react-router-dom";

export const useId = <T extends string | undefined = string>(): T => {
    const params = useParams<{ id: T }>();

    return params.id as T;
};