import { Router } from "express";
import { getDocuments, postDocument, getDocumentById, deleteDocument } from "../controllers/documents.js";

const documentRouter = Router();

documentRouter.post('', postDocument);

documentRouter.get('', getDocuments);

documentRouter.get('/:id', getDocumentById);

documentRouter.delete('/:id', deleteDocument);

export { documentRouter };