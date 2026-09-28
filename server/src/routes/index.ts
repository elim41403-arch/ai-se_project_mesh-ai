import { Router } from "express";
import { authRouter } from "./auth.js";
import { chatsRouter } from "./chats.js";
import { documentRouter } from "./document.js";
import { queryRouter } from "./query.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/chats', chatsRouter);
router.use('/documents', documentRouter);
router.use('/query', queryRouter);

export default router;