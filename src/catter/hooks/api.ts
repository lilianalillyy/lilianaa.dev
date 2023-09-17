import useSWR from "swr";
import { getCat, getCats, getRandomCat, getTag, getTags } from "../api";
import { TagType } from "../api/types";

export const useCats = (
    page: number = 1,
    catTags?: number[],
    cameraTags?: number[],
    contentTags?: number[]
) => useSWR(
    `cats:${page}:${catTags?.join(",") ?? ""}:${cameraTags?.join(",") ?? ""}:${contentTags?.join(",") ?? ""}`,
    () => getCats(page, catTags, cameraTags, contentTags)
);

export const useCat = (
    id: number
) => useSWR(`cat:${id}`, () => getCat(id));

export const useRandomCat = <IdOnly extends boolean = false>(
    catTagId?: number,
    idOnly?: IdOnly,
) => useSWR(`cat-random:${catTagId}`, () => getRandomCat<IdOnly>(catTagId, idOnly));

export const useTags = <T extends TagType = TagType>(
    type?: T
) => useSWR(`tags:${type}`, () => getTags<T>(type));

export const useTag = <T extends TagType = TagType>(
    id: number
) => useSWR(`tag:${id}`, () => getTag<T>(id));