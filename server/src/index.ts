import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import router from './routes/index.js';
import { requestLogger } from './middleware/loggers.js';
import { logger } from './utils/logger.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.set('trust proxy', 1);

app.get("/health", (req, res): void => {
    res.status(200).json({
        "success": true,
        "data": { "status": "ok" },
        "error": null
    });
});
app.get('/test-error', () => {
  throw new Error('Test error');
});

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    logger.info('MongoDB connected');
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  })
  .catch((err) => {
    logger.error('Connection error', err);
  });