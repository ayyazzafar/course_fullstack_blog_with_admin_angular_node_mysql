import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./Post";
import { Tag } from "./Tag";


@Table
export class PostTag  extends Model<PostTag>{
    
    @ForeignKey(()=>Post)
    @Column
    postId?: number 

    @ForeignKey(()=>Tag)
    @Column
    tagId?: number
}