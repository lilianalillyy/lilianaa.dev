import { useMemo, useState } from "preact/hooks";
import { useCats, useTags } from "../hooks/api";
import { Tag as ApiTag, TagType } from "../api/types";
import { Tag } from "../components/Tag";
import { TagContainer } from "../components/TagContainer";
import { SectionContainer } from "../components/SectionContainer";
import { Loading } from "../../components/ui/Loading";
import { Link, useNavigate } from "react-router-dom";
import { useNumberId } from "../../hooks/useNumberId";
import { CatView } from "../components/CatView";
import { Cat } from "../components/Cat";
import { useTitle } from "../../hooks/useTitle";

export const CatterIndex = () => {
    const catId = useNumberId();
    const navigate = useNavigate();

    const { data: tags = [], isLoading: tagsLoading } = useTags();

    const [selectedContentTags, setSelectedContentTags] = useState<number[]>([]);
    const [selectedCameraTags, setSelectedCameraTags] = useState<number[]>([]);
    const [selectedCatTags, setSelectedCatTags] = useState<number[]>([]);

    const contentTags = useMemo(
        () => tags.filter(t => t.type === TagType.ContentTag) as ApiTag<TagType.ContentTag>[],
        [tags]
    );

    const cameraTags = useMemo(
        () => tags.filter(t => t.type === TagType.CameraTag) as ApiTag<TagType.CameraTag>[],
        [tags]
    );

    const catTags = useMemo(
        () => tags.filter(t => t.type === TagType.CatTag) as ApiTag<TagType.CatTag>[],
        [tags]
    );

    const isTagSelected = (tag: ApiTag) => {
        // todo: refactor, this is miserable
        return (tag.type === TagType.CameraTag
            ? selectedCameraTags
            : tag.type === TagType.ContentTag
                ? selectedContentTags
                : selectedCatTags).indexOf(tag.id) !== -1;
    }

    const handleTagClick = (tag: ApiTag) => {
        // todo: refactor, this is maybe even more miserable
        const setter = tag.type === TagType.CameraTag
            ? setSelectedCameraTags
            : tag.type === TagType.ContentTag
                ? setSelectedContentTags
                : setSelectedCatTags;

        setter(prev => prev.indexOf(tag.id) !== -1
            ? prev.filter(t => t !== tag.id)
            : [...prev, tag.id]
        );
    };

    const { data: cats = [], isLoading: catsLoading } = useCats(1, selectedCatTags, selectedCameraTags, selectedContentTags);

    useTitle("", "Catter");

    return (
        <>
            {catId && (
                <CatView onClose={() => navigate("/catter")} catId={catId} />
            )}

            <div className="w-screen min-h-screen bg-violet-600">
                <div className="container mx-auto px-8 py-12">
                    <h1 class="text-3xl tracking-wider font-medium font-mono text-white">
                        Catter &bull; <Link to="/">Liliana</Link>
                    </h1>

                    {!tagsLoading ? (
                        <SectionContainer>
                            <TagContainer>
                                {contentTags.map((t) => <Tag selected={isTagSelected(t)} onClick={() => handleTagClick(t)} key={t.id} tag={t} />)}
                            </TagContainer>

                            <TagContainer>
                                {cameraTags.map((t) => <Tag selected={isTagSelected(t)} onClick={() => handleTagClick(t)} key={t.id} tag={t} />)}
                            </TagContainer>

                            <TagContainer>
                                {catTags.map((t) => <Tag selected={isTagSelected(t)} onClick={() => handleTagClick(t)} key={t.id} tag={t} />)}
                            </TagContainer>
                        </SectionContainer>
                    ) : (
                        <Loading />
                    )}

                    {!catsLoading ? (
                        <SectionContainer>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {cats.length ? (
                                    cats.map(cat => <Cat key={cat.id} cat={cat}/>)
                                ) : (
                                    <p className="font-mono text-white tracking-widest">No kitties found :&lt;</p>
                                )}
                            </div>
                        </SectionContainer>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
}