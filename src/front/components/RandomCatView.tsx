import { useEffect, useState } from "preact/hooks";
import { CatView } from "../../catter/pages/CatView";
import { getRandomCat } from "../../catter/api";
import { toast } from "../../utils/toast";

export interface RandomCatViewProps {
    catTagId?: number;
    onClose?: () => void;
}

export const RandomCatView = ({ catTagId, onClose }: RandomCatViewProps) => {
    const [catId, setCatId] = useState<number|null>(null);

    useEffect(() => {
        getRandomCat(catTagId, true)
            .then((catId) => {
                if (!catId) {
                    toast({
                        status: 'error',
                        description: "No kitty found :<"
                    })

                    onClose?.();
                }
                setCatId(catId);
            })
    }, [catTagId]);

    return catId ? <CatView catId={catId} onClose={onClose}/> : null;
}