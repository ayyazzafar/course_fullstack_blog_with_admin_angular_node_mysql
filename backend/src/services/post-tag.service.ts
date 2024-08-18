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