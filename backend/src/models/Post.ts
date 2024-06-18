import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { PostTag } from "./PostTag";


@Table
export class Post extends Model<Post>{



    @Column({
        allowNull: false
    })
    title: string = ''


    @Column({
        allowNull: false
    })
    content: string = ''

    @Column({
        allowNull: false,
        unique: true
    })
    slug: string = ''


    @ForeignKey(()=>User)
    @Column({
        allowNull: false
    })
    userId?: number;

    @BelongsTo(()=>User)
    user?: User;

    @HasMany(()=>Comment)
    comments: Comment[] = []

    @BelongsToMany(()=>Tag, ()=>PostTag)
    tags: Tag[] = []
}



