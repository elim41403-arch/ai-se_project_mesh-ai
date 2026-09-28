import { Router } from "express";
import { getDocuments, uploadDocument, getDocumentById, deleteDocument } from "../controllers/documents.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const documentRouter = Router();

documentRouter.use(auth);

const upload = multer({ dest: 'uploads/' });
documentRouter.post('/', upload.single('file'), uploadDocument);

documentRouter.use(auth);

documentRouter.get('', getDocuments);

documentRouter.get('/:id', getDocumentById);

documentRouter.delete('/:id', deleteDocument);

export { documentRouter };