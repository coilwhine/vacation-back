import { NextFunction, Request, Response, Router } from "express";
import { decode } from "jsonwebtoken";
import { tokenAuthenticate } from "../3-middleware/tokenAuthenticate";
import { VacationModel } from "../4-models/vacationModel";
import { deleteImageFromS3 } from "../5-logic/aws-logic";
import { addVacation, createFile, deleteVacation, editVacation, getAllVacations, getVacationById, getVacationsAndLikes, getVacationsByPage, likeVacation, unlikeVacation, userLikedVacation, vacationLikes } from "../5-logic/vacation-logic";

export const vacationRouter = Router();

vacationRouter.get('/', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getAllVacations();
    res.send(resoult);
})

vacationRouter.get('/page', tokenAuthenticate([0, 1]), async (req: Request, res: Response, next: NextFunction) => {
    const page = +req.query.page;
    const liked = req.query.liked === 'true';
    const present = req.query.present === 'true';
    const future = req.query.future === 'true';
    const userId = req.headers.userid

    const resoult = await getVacationsByPage(+userId, page, liked, present, future);
    res.send(resoult);
})

vacationRouter.get('/reports', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await getVacationsAndLikes();
    res.send(resoult);
})

vacationRouter.post('/', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const resoult = await addVacation(req.body, req.files);
    res.send(resoult);
})

vacationRouter.put('/:id', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const [vacation] = await getVacationById(+id);
    deleteImageFromS3(vacation.image);

    const resoult = await editVacation(req.body, req.files);
    res.send(resoult);
})

vacationRouter.delete('/:id', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const [vacation] = await getVacationById(+id);
    deleteImageFromS3(vacation.image);

    const resoult = await deleteVacation(+id);
    res.send(resoult);
})

vacationRouter.post('/like', tokenAuthenticate([0, 1]), async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)
    const sentVacation = req.body.vacation

    const tokenId = (decodeToken.sub).toString()
    const vacationId = (sentVacation).toString()

    const resoult = await likeVacation(tokenId, vacationId)
    res.send(resoult)

})

vacationRouter.post('/unlike', tokenAuthenticate([0, 1]), async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)
    const sentVacation = req.body.vacation

    const tokenId = (decodeToken.sub).toString()
    const vacationId = (sentVacation).toString()

    const resoult = await unlikeVacation(tokenId, vacationId)
    res.send(resoult)

})

vacationRouter.get('/userliked', tokenAuthenticate([0, 1]), async (req: Request, res: Response, next: NextFunction) => {

    const authToken: any = req.headers.authentication
    const decodeToken = decode(authToken)

    const tokenId = (decodeToken.sub).toString()

    const resoult = await userLikedVacation(tokenId)
    res.send(resoult)

})

vacationRouter.get('/vacationlikes', tokenAuthenticate([0, 1]), async (req: Request, res: Response, next: NextFunction) => {

    const vicationId = req.query.id

    const resoult = await vacationLikes(+vicationId)
    res.send(resoult)

})

vacationRouter.get('/download', tokenAuthenticate([1]), async (req: Request, res: Response, next: NextFunction) => {
    const data = await getVacationsAndLikes();
    await createFile(data)

    res.download("dataFile.csv");
})