import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Token } from "./Token";

@Table
export class User extends Model<User> {


  @Column({
    allowNull: false
  })
  name: string = "";

  @Column({
    unique: true,
    allowNull: false
  })
  email: string = "";

  @Column({
    allowNull: false
  })
  password: string = "";


  @HasMany(()=>Post)
  posts: Post[] = []

  @HasMany(()=>Comment)
  comments: Comment[] = []

  @HasMany(()=>Token)
  tokens: Token[] = []

}