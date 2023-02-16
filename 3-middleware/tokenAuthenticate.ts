import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { UserRole } from '../4-models/userModel';
import { getUserById } from "../5-logic/auth-logic";

export function tokenAuthenticate(userRoles: UserRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader: string | any = req.headers.authentication;
        if (!authHeader) return res.status(401).send({ error: 'No token provided.' });

        try {
            const token = authHeader;
            const { sub } = decode(token)

            const { password, userRole } = await getUserById(+sub);

            if (userRoles.includes(userRole)) {
                verify(token, password);
                console.log('good')
            } else {
                console.log('bad')
                throw new Error("bad role");
            }

        } catch (error) {
            res.status(400).send(error.message);
            return
        }
        next();
    };
}