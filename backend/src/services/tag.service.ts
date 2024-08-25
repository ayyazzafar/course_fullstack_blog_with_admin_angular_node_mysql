import { Tag } from "../models/Tag"


export const getAllTags = (
    filters?:{
        userId?: number
    }
)=>{
    const where: any = {};
    if(filters){
        if(filters.userId){
            where.userId = filters.userId;
        }
    }
        return Tag.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            where,
        });
}

export const addTag = (name: string, slug: string, userId: number)=>{
    const tag = new Tag();
    tag.name = name; 
    tag.userId = userId;
    tag.slug = slug;

    return tag.save();

}

export const getTagBySlug = (slug: string)=>{
    return Tag.findOne({
        where:{
            slug
        }
    })
}

export const getTagById = (id: number)=>{
    return Tag.findByPk(id);
}

export const deleteTag = (id: number)=>{
    return Tag.destroy({
        where:{
            id
        }
    })
}

export const getTagsByIds = (ids: number[])=>{
    return Tag.findAll({
        where:{
            id: ids 
        }
    });
}