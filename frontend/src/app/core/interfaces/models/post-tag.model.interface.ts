import { IPost } from "./post.model.interface";
import { ITag } from "./tag.model.interface";


export interface IPostTag{
    postId: number;
    tagId: number;
    post: IPost;
    tag: ITag;
    createdAt: string;
    updatedAt: string;
}