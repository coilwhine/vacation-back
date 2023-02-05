import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../2-utils/auth";
import { createNewUser, getAllUsers, getUserByEmail, getUserById } from "../5-logic/auth-logic";

export const authRouter = Router();

authRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getAllUsers();
    res.send(resoult);
})

authRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const resoult = await getUserById(+id);
    res.send(resoult);
})

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
        res.status(404).send('This email does not exist');
    } else if (user.password !== req.body.password) {
        res.status(401).send('Incorrect password');
    } else {
        const token = generateToken(user)
        res.send(token);
    }
    return;
})

authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const chakeForUser = await getUserByEmail(req.body.email);

    if (chakeForUser) {
        res.status(401).send('Email Has Already Been Taken');
        return;
    }

    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    const token = await createNewUser(user);
    res.send(token);
})