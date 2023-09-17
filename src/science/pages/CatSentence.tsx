import { nickname } from "../../utils/constants"
import { Tag, TagType } from "../../catter/api/types"
import { useTags } from "../../catter/hooks/api";
import { Loading } from "../../components/ui/Loading";
import { useState } from "preact/hooks";
import { RandomCatView } from "../../catter/components/RandomCatView";
import { Gateway } from "../../front/components/Gateway";

// i was procrastinating
export const CatSentence = () => {
    const { data: catTags, isLoading } = useTags(TagType.CatTag);

    const [activeCatTag, setActiveCatTag] = useState<number | null>(null);

    const CatButton = ({ tag }: { tag: Tag<TagType.CatTag> }) => <button onClick={() => setActiveCatTag(tag.id)} className={"text-violet-700 font-semibold"}>{tag.content}</button>

    return <Gateway>
        {isLoading ? <Loading /> : <>
            {catTags && <>
                Hi, I am {nickname} and I {catTags.length ? (
                    <>
                        have {catTags.length} {catTags.length > 1 ? "cats" : "cat"} &ndash;{" "}
                        {/**
                           *  yes, we are all aware of Intl.ListFormat which can concat strings in a sentence, 
                           * however this can't be used with JSX but only strings, so this hack-a-voodoo will have to do,
                           * at least for now. 
                           */}
                        {catTags.slice(0, -1).map((tag, i) => <>
                            <CatButton key={tag.id} tag={tag} />
                            {i !== catTags.length - 2 && ","}
                        </>)} and <CatButton tag={catTags[catTags.length - 1]} />
                    </>
                ) : "don't have any cats"}
            </>}

            {activeCatTag && <RandomCatView catTagId={activeCatTag} onClose={() => setActiveCatTag(null)} />}
        </>}
    </Gateway>
}