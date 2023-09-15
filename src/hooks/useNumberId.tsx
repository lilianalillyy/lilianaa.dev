import { useId } from "./useId";

export const useNumberId = (): number | null => {
    const id = useId();
    if (!id) return null;

    const numberId = Number(id);
    return !isNaN(numberId) ? numberId : null;
} 