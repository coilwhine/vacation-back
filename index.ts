import cors from "cors";
import express, { json } from "express";
import { authRouter } from "./6-controller/auth-controller";

const server = express();

server.use(cors({ origin: 'http://localhost:3000' }))
server.use(json());
server.use('/auth', authRouter);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});