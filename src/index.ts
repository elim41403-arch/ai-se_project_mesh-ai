import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(router);

app.get("/health", (req, res): void => {
    res.status(200).json({
        "success": true,
        "data": { "status": "ok" },
        "error": null
    });
});

const port = 3000;
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})