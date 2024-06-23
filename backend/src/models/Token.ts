import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "./User";
import { type } from "os";


@Table
export class Token extends Model<Token>{

    @Column({
        allowNull: false
    })
    token?: string;


    @Column({
        type: DataType.ENUM('activation', 'reset', 'access', 'refresh'),
        allowNull: false
    })
    type?: 'activation' | 'reset' | 'access' | 'refresh';


    @ForeignKey(()=>User)
    @Column({
        allowNull: false
    })
    userId?: number;
    

    @BelongsTo(()=>User)
    user?: User;

    
}