import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { PostTag } from "./PostTag";
import { Category } from "./Category";


@Table
export class Post extends Model<Post>{



    @Column({
        allowNull: false
    })
    title?: string;


    @Column({
        allowNull: false
    })
    content?: string;

    @Column({
        allowNull: false,
        unique: true
    })
    slug?: string;


    @ForeignKey(()=>User)
    @Column({
        allowNull: false
    })
    userId?: number;

    @ForeignKey(()=>Category)
    @Column({
        allowNull: false
    })
    categoryId?: number;

    @BelongsTo(()=>User)
    user?: User;

    @BelongsTo(()=>Category)
    category?: Category;

    @HasMany(()=>Comment)
    comments: Comment[] = []

    @BelongsToMany(()=>Tag, ()=>PostTag)
    tags: Tag[] = []
}



