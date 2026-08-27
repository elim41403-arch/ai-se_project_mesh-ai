import { Router } from "express";
import { getDocuments, postDocuments, getDocumentsById, deleteDocuments } from "../controllers/documents.js";

const documentRouter = Router();

documentRouter.post('', postDocuments);

documentRouter.get('', getDocuments);

documentRouter.get('/:id', getDocumentsById);

documentRouter.delete('/:id', deleteDocuments);

export { documentRouter };