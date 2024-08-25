import { Category } from "../models/Category";


export async function getAllCategories(filters?: {
    userId?: number
}){

    const where: any = {};

    if(filters){
        if(filters.userId){
            where.userId = filters.userId;
        }
    }
    
    const categories = await Category.findAll(
        {   
            where,
            order:[
                ['id', 'DESC']
            ]
        }
    ); // select * from categories

    return categories;

}

export async function addCategory(name: string, slug: string,  userId: number){
    const category = new Category();
    category.name = name;
    category.userId = userId;
    category.slug = slug;

    await category.save();

    return category;
}

export async function getCategoryBySlug(slug: string){
    const category = await Category.findOne({
        where: {
            slug
        }
    });


    return category;
}


export async function updateCategory(name: string, slug: string, id: number){
    const category = await Category.findByPk(id);
    if(!category){
        throw new Error('Category not found'); 
    }

    if(name) category.name = name;
    if(slug) category.slug = slug;
    await category.save();

    return category;
}

export async function getCategoryById(id: number){
    const category = await Category.findByPk(id);
    return category;
}


export async function deleteCategory(id: number){
    const category = await Category.findByPk(id);

    if(!category){
        throw new Error('Category not found');
    }

    await category.destroy();
    return category;
}