import { sign } from "jsonwebtoken";
import { UserModel } from "../4-models/userModel";

export function generateToken(user: UserModel) {
    const token = sign({
        "sub": user.id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "userRole": user.userRole
    }, user.password);

    console.log(user.password)
    console.log(token)

    return token;
}