import { Request, Response } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryBySlug, updateCategory } from "../services/category.service";
import { generateSlug } from "../shared/general.util";
import { z } from "zod";
import { User } from "../models/User";
import { deletePost, getAllPosts } from "../services/post.service";
import { deletePostTagRelations } from "../services/post-tag.service";
import { deletePostComments } from "../services/comment.service";



export const getCategories = async (req: Request, res: Response) => {
    // get user from req
    const user = (req as any).user as User;
    const categories = await getAllCategories({
        userId: user.get('id')
    });
    console.log('categories', JSON.stringify(categories))
    res.json(categories)
}

export const getCategoryBySlugController = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return res.status(404).json({ message: 'Category not found' })
    }

    res.json(category)

}


export const addCategoryController = async (req: Request, res: Response) => {
    const schema = z.object({
        name: z.string()
    });

    const user = (req as any).user as User

    const schemaValidator = schema.safeParse(req.body);
    if (!schemaValidator.success) {
        return res.status(400).json({ message: 'Invalid data', errors: schemaValidator.error })
    }

    const { name } = req.body;
    const userId = user.get('id');
    let slug = generateSlug(name);

    const categoryBySlug = await getCategoryBySlug(slug);

    if (categoryBySlug) {
        slug = generateSlug(name, true);
    }

    const category = await addCategory(name, slug, userId);

    res.json(category)
}


export const updateCategoryController = async (req: Request, res: Response) => {

    const schema = z.object({
        name: z.string(),
        id: z.number()
    });

    const schemaValidator = schema.safeParse(req.body);
    if (!schemaValidator.success) {
        return res.status(400).json({ message: 'Invalid data', errors: schemaValidator.error })
    }

    let { name, id } = req.body;

    let slug = generateSlug(name);

    const categoryBySlug = await getCategoryBySlug(slug);

    if (categoryBySlug) {
        res.status(400).json({ message: 'Category already exists' })
    }

    // check if category exist by the given id
    let dbCategory = await getCategoryById(id);

    if (!dbCategory) {
        res.status(404).json({ message: 'Category not found' })
    }

    // update the category
    let updatedCategory = await updateCategory(name, slug, id);


    res.json(updatedCategory);

}


export const deleteCategoryController = async (req: Request, res: Response) => {

    const schema = z.object({
        id: z.number()
    });

    const schemaValidator = schema.safeParse(req.body);
    if (!schemaValidator.success) {
        return res.status(400).json({ message: 'Invalid data', errors: schemaValidator.error })
    }

    const { id } = req.body;

    const category = await getCategoryById(id);
    if (!category) {
        res.status(404).json({ message: 'Category not found' })
    }

    // getting all posts that belongs to the category
    const posts = await getAllPosts({
        categoryId: id
    });

    const postIds = posts.map(post => post.get('id'));


    await deletePostTagRelations({
        postId: postIds
    }); // delete post tag relations

    await deletePostComments(postIds); // delete post comments

    await deletePost(postIds); // delete posts

    await deleteCategory(id);

    res.json(category)
}