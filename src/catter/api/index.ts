import qs from "qs";
import { Cat, CatListResponse, CatViewResponse, RandomCatResponse, Tag, TagListResponse, TagType, TagViewResponse } from "./types";

export const baseUrl = import.meta.env.DEV ? "http://localhost:16000" : "https://catter.liliana.digital";

export const qsOptions: qs.IStringifyOptions = { arrayFormat: 'brackets', addQueryPrefix: true };

export const endpoint = (endpoint: string) => `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

export const getCats = async (
    page: number = 1,
    catTags?: number[],
    cameraTags?: number[],
    contentTags?: number[]
): Promise<Cat[]> => {
    try {
        const res: CatListResponse = await (await fetch(endpoint(`/api/cat${qs.stringify({
            page,
            catTags,
            cameraTags,
            contentTags,
        }, qsOptions)}`))).json();

        if (!res.success) return [];

        return res.data.cats;
    } catch (e) {
        console.log({ e });
        return [];
    }
}

export const getCat = async (id: number): Promise<Cat | null> => {
    try {
        const res: CatViewResponse = await (await fetch(endpoint(`/api/cat/${id}`))).json();

        if (!res.success) return null;

        return res.data.cat;
    } catch (e) {
        console.log({ e });

        return null;
    }
}

export const getRandomCat = async <IdOnly extends boolean = false>(catTagId?: number, idOnly?: IdOnly): Promise<IdOnly extends true ? number | null : Cat | null> => {
    try {
        const res: RandomCatResponse<IdOnly> = await (await fetch(endpoint(`/api/cat/random${qs.stringify({ catTagId, idOnly }, qsOptions)}`))).json();

        if (!res.success) return null;

        return res.data.cat;
    } catch (e) {
        console.log({ e });

        return null;
    }
}

export const getTags = async <T extends TagType = TagType>(type?: T): Promise<Tag<T>[]> => {
    try {
        const res: TagListResponse<T> = await (await fetch(endpoint(`/api/tag${qs.stringify({ type }, qsOptions)}`))).json();

        if (!res.success) return [];

        return res.data.tags;
    } catch (e) {
        console.log({ e });

        return [];
    }
}

export const getTag = async <T extends TagType = TagType>(id: number): Promise<Tag<T> | null> => {
    try {
        const res: TagViewResponse<T> = await (await fetch(endpoint(`/api/tag/${id}`))).json();

        if (!res.success) return null;

        return res.data.tag;
    } catch (e) {
        console.log({ e })

        return null;
    }
}