import { Request, Response } from "express";
import { addPost, deletePost, getAllPosts, getPostById, getPostBySlug, updatePost } from "../services/post.service";
import { z } from "zod";
import { generateSlug } from "../shared/general.util";
import { getCategoryById } from "../services/category.service";
import { getTagsByIds } from "../services/tag.service";
import { addPostTags, deletePostTagRelations, getPostTags } from "../services/post-tag.service";
import { User } from "../models/User";
import { getTotalCommentsByPostIds } from "../services/comment.service";



export const getAllPostsController = async (req: Request, res: Response) => {
    
    // zod schema for accepting filters from query string variables
    const schema = z.object({
        categoryId: z.string().optional(),
        tagId: z.string().optional()
    });

    // get user from req
    const user = (req as any).user as User;




    // parsing query string variables
    const safeData = schema.safeParse(req.query);

    if (!safeData.success)
        return res.status(400).json(safeData.error);

    const { categoryId, tagId } = safeData.data;


    const posts = await getAllPosts({
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        tagId: tagId ? parseInt(tagId) : undefined,
        userId: user.get('id')
    });

   let postIds = posts.map((post) => post.id);
   const totalCommentsByPostIds = await getTotalCommentsByPostIds(postIds);

    // adding total comments to each post
    const postsWithTotalComments = posts.map((post) => {
         const totalComments = totalCommentsByPostIds.find((
            totalCommentsByPostId
         )=>
            totalCommentsByPostId.postId === post.id);

            return {
                ...post.toJSON(),
                totalComments: totalComments?.get('totalComments') || 0
            }
    });

    return res.json(postsWithTotalComments)
}

export const addPostController = async (req: Request, res: Response) => {

    const user = (req as any).user as User

    const schema = z.object({
        title: z.string(),
        content: z.string(),
        categoryId: z.number(),
        tagIds: z.array(z.number()).optional()
    });

    const safeData = schema.safeParse(req.body);

    if (!safeData.success)
        return res.status(400).json(safeData.error)

    const { title, content, categoryId, tagIds } = safeData.data;


    await validateTags(res, tagIds);

    let slug = generateSlug(title);

    // check if slug is unique
    const existingPostWithGivenSlug = await getPostBySlug(slug);

    if (existingPostWithGivenSlug)
        slug = generateSlug(title, true);

    // verify if category id is valid
    const category = await getCategoryById(categoryId);
    if (!category)
        return res.status(400).json({ message: "Invalid category id" });

    const post = await addPost(
        title,
        content,
        categoryId,
        user.get('id'),
        slug
    );

    // add tags to post
    if (tagIds && tagIds.length > 0) {
        await addPostTags(post.id, tagIds);
    }


    return res.json(post);


}

export const updatePostController = async (req: Request, resp: Response) => {

    const user = (req as any).user as User

    const userId =  user.get('id');

    const schema = z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        categoryId: z.number().optional(),
        tagIds: z.array(z.number()).optional()
    });

    const safeData = schema.safeParse(req.body);

    if (!safeData.success)
        return resp.status(400).json(safeData.error);

    let { id, title, content, categoryId, tagIds } = safeData.data;

    // checking if post id is valid
    const post = await getPostById(id);

    // check if all tags are valid
    await validateTags(resp, tagIds);

    if (!post)
        return resp.status(400).json({ message: "Invalid post id" });

    // make sure if user has rights to update the post
    if (post.userId !== userId)
        return resp.status(403).json({ message: "You are not authorized to update this post" });

    // check if category id is valid
    if (categoryId) {
        const category = await getCategoryById(categoryId);
        if (!category)
            return resp.status(400).json({ message: "Invalid category id" });
    }

    let slug;
    // check if title was updated, if yes, generate new slug
    if (title && title !== post.title) {
        slug = generateSlug(title);

        // check if slug is unique
        const existingPostWithGivenSlug = await getPostBySlug(slug);

        if (existingPostWithGivenSlug)
            slug = generateSlug(title, true);
    }

    const updatedPost = await updatePost(id, title, content, categoryId, slug);

    const postTagRelations = await getPostTags(id);

    if(tagIds){
        // get the tagsIds that were not in the body of this http request.
        const tagIdsToDelete = postTagRelations.filter((postTagRelation) => {
            return !tagIds?.includes(postTagRelation.tagId!);
        });

        // delete tags from post
        tagIdsToDelete.forEach(async (postTagRelation) => {
            await postTagRelation.destroy();
        });
    }

    // add tags to post
    if (tagIds && tagIds.length > 0) {
        tagIds = tagIds?.filter((tagId) => {
            const postTag = postTagRelations.find((postTagRelation) => {
                return postTagRelation.tagId === tagId;
            });
            return !postTag;
        });

        if (tagIds.length > 0)
            await addPostTags(post.id, tagIds);
    }


    return resp.json(updatedPost);


}

export const deletePostController = async (req: Request, resp: Response) => {

    const user = (req as any).user as User

    const userId = user.get('id');

    const schema = z.object({
        id: z.number()
    });

    const safeData = schema.safeParse(req.body);

    if (!safeData.success)
        return resp.status(400).json(safeData.error);

    const { id } = safeData.data;

    // checking if post id is valid
    const post = await getPostById(id);
    if (!post) {
        return resp.status(400).json({ message: "Invalid post id" });
    }

    // make sure if user has rights to delete the post
    if (post.userId !== userId)
        return resp.status(403).json({ message: "You are not authorized to delete this post" });

    await deletePostTagRelations({postId: id});


    await deletePost(id);


    return resp.json(post);
}


export const getPostBySlugController = async (req: Request, resp: Response) => {
    const { slug } = req.params;

    if (!slug)
        return resp.status(400).json({ message: "Invalid slug" });

    const post = await getPostBySlug(slug);

    if (!post)
        return resp.status(404).json({ message: "Post not found" });


    return resp.json(post);
}


async function validateTags(res: Response, tagIds?: number[]) {
    if (tagIds && tagIds.length > 0) {
        // check if all tags are valid
        const tags = await getTagsByIds(tagIds);
        if (tags.length !== tagIds.length) {
            return res.status(400).json({ message: "Invalid tag id(s)" });
        }

    }
}