import express from 'express';
import router from './routes/index.js';
import { logger } from './middleware/loggers.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

const app = express();

app.use(express.json());
app.use(logger);
app.use(router);

app.get('/test-error', () => {
  throw new Error('Test error');
});

app.get("/health", (req, res): void => {
    res.status(200).json({
        "success": true,
        "data": { "status": "ok" },
        "error": null
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

const port = 3000;
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})