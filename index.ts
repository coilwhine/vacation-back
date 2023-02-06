import cors from "cors";
import express, { json } from "express";
import { authRouter } from "./6-controller/auth-controller";
import * as dotenv from "dotenv"
import { vacationRouter } from "./6-controller/vacation-consroller";
dotenv.config()

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }))
server.use(json());
server.use('/auth', authRouter);
server.use('/vacation', vacationRouter);


server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});