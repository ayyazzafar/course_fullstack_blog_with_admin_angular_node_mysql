import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Post } from "./Post";


@Table
export class Comment extends Model<Comment>{


    @Column({
        allowNull: false
    })
    content?: string


    @ForeignKey(()=>User)
    @Column({
        allowNull: false
    })
    userId?: number

    @ForeignKey(()=>Post)
    @Column({
        allowNull: false
    })
    postId?: number

    @BelongsTo(()=>Post)
    post?: Post;


    @BelongsTo(()=>User)
    user?: User;
}