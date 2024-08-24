import { PostTag } from "../models/PostTag"
import { Tag } from "../models/Tag";


export const addPostTags = async (postId: number, tagIds: number[])=>{
    const data: any = tagIds.map((tagId)=>({
        postId,
        tagId
    }))
    return await PostTag.bulkCreate(data);
}



export const getPostTags = async (postId: number)=>{

    return await PostTag.findAll({
        include:[Tag],
        where:{
            postId
        }
    });
}

export const deletePostTagRelations = async ({postId, tagId}:{
    postId?: number | number[],
    tagId?: number | number[]
})=>{

    let where: any = {};
    if(postId) where.postId = postId;
    if(tagId) where.tagId = tagId;

    return await PostTag.destroy({
        where
    });
}