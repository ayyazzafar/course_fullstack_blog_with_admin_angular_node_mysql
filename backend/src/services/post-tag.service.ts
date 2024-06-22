import { PostTag } from "../models/PostTag"


export const addPostTags = async (postId: number, tagIds: number[])=>{
    const data: any = tagIds.map((tagId)=>({
        postId,
        tagId
    }))
    return await PostTag.bulkCreate(data);
}