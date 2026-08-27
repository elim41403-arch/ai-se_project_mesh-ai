import { Router } from "express";
import { getChats, postChat, getChatById, deleteChat, postChatById } from "../controllers/chats.js";

const chatsRouter = Router();

chatsRouter.get('', getChats);

chatsRouter.post('', postChat);

chatsRouter.get('/:id', getChatById);

chatsRouter.delete('/:id', deleteChat);

chatsRouter.post('/:id/messages', postChatById);

export { chatsRouter };