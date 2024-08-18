import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./Post";
import { Tag } from "./Tag";


@Table
export class PostTag  extends Model<PostTag>{
    
    @ForeignKey(()=>Post)
    @Column({ 
            allowNull: false
        })
    postId?: number 

    @ForeignKey(()=>Tag)
    @Column({
        allowNull: false
    })
    tagId?: number

    // add associations
    @BelongsTo(()=>Post)
    post?: Post

    @BelongsTo(()=>Tag)
    tag?: Tag
    
}