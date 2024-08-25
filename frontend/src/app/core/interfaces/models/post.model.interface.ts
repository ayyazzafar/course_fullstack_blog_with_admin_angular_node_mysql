import { ICategory } from "./category.model.interface";
import { IUser } from "./user.model.interface";


export interface IPost{
    id: number;
    title: string;
    content: string;
    slug: string;
    userId: string;
    user: IUser
    categoryId: number;
    totalComments?: number;
    category: ICategory;
    createdAt: string;
    updatedAt: string;
}