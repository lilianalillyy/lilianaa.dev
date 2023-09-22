import { Link } from "react-router-dom";
import { Image } from "../../components/ui/Image";
import { Tag } from "./Tag";
import { formatDate } from "../../utils";
import { Cat as CatType } from "../api/types";
import { endpoint } from "../api";

export interface CatProps {
    cat: CatType;
}

export const Cat = ({ cat }: CatProps) => <Link key={cat.id} to={`/catter/${cat.id}`}>
    <Image containerClassName="h-96" className="h-full w-full object-cover" src={endpoint(cat.image_url)} alt={cat.page_title ?? ""}>
        <div className="absolute inset-0 p-4 flex flex-col gap-4 md:flex-row md:justify-between items-end opacity-50 hover:opacity-100 transition duration-300 ease-in-out">
            <div className={"inline-flex flex-col items-end md:items-start gap-2"}>
                {cat.cat_tags.length && (
                    cat.cat_tags.map(tag => <Tag className="w-fit" key={tag.id} compact tag={tag} />)
                )}
            </div>
            <div>
                <p className="text-white font-mono text-xs">{formatDate(new Date(cat.date))}</p>
            </div>
        </div>
    </Image>
</Link>