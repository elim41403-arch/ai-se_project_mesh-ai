import { Router } from "express";
import { getCurrentUser, postLogin, postRegister } from "../controllers/auth.js";

const authRouter = Router();

authRouter.get('/me', getCurrentUser);

authRouter.post('/register', postRegister);

authRouter.post('/login', postLogin);


export { authRouter };