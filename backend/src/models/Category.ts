import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Post } from "./Post";


@Table
export class Category extends Model<Category>{


    @Column({
        allowNull: false
    })
    name?: string

    @Column({
        allowNull: false,
        unique: true
    })
    slug?: string


    @ForeignKey(()=>User)
    @Column({
        allowNull: false
    })
    userId?: number;

    @BelongsTo(()=>User)
    user?: User;

    @HasMany(()=>Post)
    posts: Post[] = []
}