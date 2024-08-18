import { IUser } from "./user.model.interface";


export interface IComment{
    id: number;
    postId: number;
    content: string;
    userId: number;
    user: IUser;
    createdAt: string;
    updatedAt: string;
}