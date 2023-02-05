import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { UserRole } from '../4-models/userModel';
import { getUserById } from "../5-logic/auth-logic";

export function tokenAuthenticate(userRoles: UserRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader: string | any = req.headers.authentication;
        if (!authHeader) return res.status(401).send({ error: 'No token provided.' });
        const token = authHeader.substring(7)

        try {
            const { sub } = decode(token)
            const { password, userRole } = await getUserById(+sub);
            if (!userRoles.includes(userRole)) throw new Error("bad role");
        } catch (error) {
            next(error)
        }
        next()
    };
}