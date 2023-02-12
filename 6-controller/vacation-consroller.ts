import { NextFunction, Request, Response, Router } from "express";
import { decode } from "jsonwebtoken";
import { addVacation, deleteVacation, getAllVacations, getVacationsByPage, likeVacation, unlikeVacation, userLikedVacation, vacationLikes } from "../5-logic/vacation-logic";

export const vacationRouter = Router();

vacationRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getAllVacations();
    res.send(resoult);
})

vacationRouter.get('/page', async (req: Request, res: Response, next: NextFunction) => {
    const page = +req.query.page;
    const liked = req.query.liked === 'true';
    const present = req.query.present === 'true';
    const future = req.query.future === 'true';
    const userId = req.headers.userid

    const resoult = await getVacationsByPage(+userId, page, liked, present, future);
    res.send(resoult);
})

vacationRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const resoult = await addVacation(req.body);
    res.send(resoult);
})

vacationRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
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

vacationRouter.get('/vacationlikes', async (req: Request, res: Response, next: NextFunction) => {

    const vicationId = req.query.id

    const resoult = await vacationLikes(+vicationId)
    res.send(resoult)

})