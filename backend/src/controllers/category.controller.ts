import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service";



export const getCategories = async (req: Request, res: Response) =>{

    const categories = await getAllCategories();

    res.json(categories)
}