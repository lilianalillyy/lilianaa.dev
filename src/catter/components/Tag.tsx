import { JSX } from "preact";
import { Tag as ApiTag, TagType } from "../../catter/api/types"
import { useMemo } from "preact/hooks";
import { CameraIcon } from "../../components/icons/CameraIcon";
import { PawIcon } from "../../components/icons/PawIcon";
import { TagIcon } from "../../components/icons/TagIcon";
import { c } from "../../utils";

export type TagColor = "primary" | "secondary";

export interface TagProps {
    tag: ApiTag;
    color?: TagColor;
    compact?: boolean;
}

export const Tag = ({ tag, selected = false, color = "primary", compact = false, className = "", ...props }: TagProps & JSX.HTMLAttributes<HTMLDivElement>) => {
    const Icon = useMemo(() => {
        switch (tag.type) {
            case TagType.CameraTag:
                return CameraIcon;
            case TagType.CatTag:
                return PawIcon;
            case TagType.ContentTag:
                return TagIcon;
        }
    }, [tag]);

    const tagContainerClassName = {
        primary: selected ? "border-white bg-white text-violet-800" : "border-violet-500 bg-violet-800 bg-opacity-30 text-white",
        secondary: selected ? "border-gray-800 bg-gray-800 text-white" : "border-gray-300 bg-gray-100 bg-opacity-30 text-black",
    }[color];

    return (
        <div className={c(
            "inline-flex gap-2 font-mono justify-center items-center border-2 backdrop-blur-md shadow hover:shadow-2xl transition duration-300 ease-in-out-cubic cursor-pointer",
            tagContainerClassName,
            compact ? "py-1 px-3" : "py-1.5 px-4",
            className,
        )} {...props}>
            <Icon className={compact ? "w-2.5 h-2.5 -mb-[0.1rem]" : "w-5 h-5"} />
            <span className={c("text-xs leading-none", compact ? "" : "-mb-0.5")}>{tag.content}</span>
        </div>
    )
}