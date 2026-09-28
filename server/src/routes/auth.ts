import { Router } from "express";
import { getCurrentUser, postLogin, postRegister } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const authRouter = Router();

authRouter.get('/me', auth, getCurrentUser);

authRouter.post('/register', postRegister);

authRouter.post('/login', postLogin);


export { authRouter };