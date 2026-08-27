import { Router } from "express";
import { getChats, postChats, getChatsById, deleteChats, postChatsById } from "../controllers/chats.js";

const chatsRouter = Router();

chatsRouter.get('', getChats),

chatsRouter.post('', postChats),

chatsRouter.get('/:id', getChatsById);

chatsRouter.delete('/:id', deleteChats);

chatsRouter.post('/:id/messages', postChatsById);

export { chatsRouter };