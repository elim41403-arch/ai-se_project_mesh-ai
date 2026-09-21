import { Router } from "express";
import { postQuery } from "../controllers/query.js";
import { auth } from "../middleware/auth.js";

const queryRouter = Router();

queryRouter.post('', auth, postQuery);

export { queryRouter };