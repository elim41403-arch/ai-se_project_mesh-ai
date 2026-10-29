import { Router } from "express";
import { getCurrentUser, postLogin, postRegister } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js"
import { loginLimiter, registerLimiter } from "../middleware/rate-limit.js";

const authRouter = Router();

authRouter.get('/me', auth, getCurrentUser);

authRouter.post('/register',registerLimiter, postRegister);

authRouter.post('/login', loginLimiter, postLogin);


export { authRouter };