import { NextFunction, Request, Response, Router } from "express";
import { getAllVacations } from "../5-logic/vacation-logic";

export const vacationRouter = Router();

vacationRouter.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getAllVacations();
    res.send(resoult);
})