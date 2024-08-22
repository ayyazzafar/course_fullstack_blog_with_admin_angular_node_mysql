import { Comment } from "../models/Comment"
import { User } from "../models/User";


export const getPostComments = async (postId: number) => {
    return Comment.findAll({
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }
        ],
        where: {
            postId
        },
        order: [['createdAt', 'DESC']]
    });
}


export const addComment = async (postId: number, userId: number, content: string) => {
    const comment = new Comment();

    comment.postId = postId;
    comment.userId = userId;
    comment.content = content;

    return comment.save();
}

export const getCommentById = async (commentId: number) => {
    return Comment.findByPk(commentId);
}

export const updateComment = async (commentId: number, content: string) => {

    const comment = await getCommentById(commentId);
    if (!comment)
        throw new Error("Comment not found");

    comment.content = content;
    return comment.save();
}

export const deleteComment = async (commentId: number) => {
    const comment = await getCommentById(commentId);
    if (!comment)
        throw new Error("Comment not found");

    return comment.destroy();
}

export const deletePostComments = async (postId: number | number []) => {
    return Comment.destroy({
        where: {
            postId
        }
    });
}