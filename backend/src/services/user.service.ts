import { User } from "../models/User"


export const getUserByEmail = async (email: string) => {
    return User.findOne({
        where:{
            email
        }
    })
}


export const addUser = async (email: string, password: string, name: string): Promise<User> => {
    const user = new User();

    user.email = email;
    user.password = password;
    user.name = name;

    return user.save();
}

