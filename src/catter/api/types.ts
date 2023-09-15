export interface SuccessResponse<D = {}> {
    success: true;
    data: D;
}

export interface ErrorResponse<E extends string = string> {
    success: false;
    error: E;
}

export type Response<D = {}, E extends string = string> = SuccessResponse<D> | ErrorResponse<E>;

export enum TagType {
    CatTag = "cat_tag",
    CameraTag = "camera_tag",
    ContentTag = "content_tag",
}

export interface Tag<T extends TagType = TagType> {
    id: number;
    type: T;
    content: string;
}

export interface Cat {
    id: number;
    image_url: string;
    cat: Tag<TagType.CatTag>;
    content: string | null;
    camera: Tag<TagType.CameraTag>;
    tags: Tag<TagType.ContentTag>[];
    date: string;
}

export type CatListResponse = Response<{
    cats: Cat[]
}>;

export type CatViewResponse = Response<{
    cat: Cat
}, "Cat not found">;

export type RandomCatResponse<IdOnly extends boolean = false> = Response<{
    cat: IdOnly extends true ? number : Cat 
}, "Cat not found">;

export type TagListResponse<T extends TagType = TagType> = Response<{
    tags: Tag<T>[]
}, "Invalid tag type">;

export type TagViewResponse<T extends TagType = TagType> = Response<{
    tag: Tag<T>
}, "Tag not found">;