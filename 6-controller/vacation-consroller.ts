import { NextFunction, Request, Response, Router } from "express";
import { decode } from "jsonwebtoken";
import { VacationModel } from "../4-models/vacationModel";
import { addVacation, deleteVacation, getAllVacations, likeVacation, unlikeVacation, userLikedVacation, vacationLikes } from "../5-logic/vacation-logic";

export const vacationRouter = Router();

vacationRouter.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getAllVacations();
    res.send(resoult);
})

vacationRouter.post('/addvacation', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const resoult = await addVacation(req.body);
    res.send(resoult);
})

vacationRouter.delete('/deletevacation/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const resoult = await deleteVacation(+id);
    res.send(resoult);
})

vacationRouter.post('/like', async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)
    const sentVacation = req.body.vacation

    const tokenId = (decodeToken.sub).toString()
    const vacationId = (sentVacation).toString()

    const resoult = await likeVacation(tokenId, vacationId)
    res.send(resoult)

})

vacationRouter.post('/unlike', async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)
    const sentVacation = req.body.vacation

    const tokenId = (decodeToken.sub).toString()
    const vacationId = (sentVacation).toString()

    const resoult = await unlikeVacation(tokenId, vacationId)
    res.send(resoult)

})

vacationRouter.get('/userliked', async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)

    const tokenId = (decodeToken.sub).toString()

    const resoult = await userLikedVacation(tokenId)
    res.send(resoult)

})

vacationRouter.post('/vacationlikes', async (req: Request, res: Response, next: NextFunction) => {

    const vicationId = req.body.id

    const resoult = await vacationLikes(vicationId)
    res.send(resoult)

})