import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';

import Url from './models/Url.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

(async () => {
    for await (const { url, short } of Url.find({})) {
        app.use(`/${short}`, (req, res) => {
            res.redirect(301, url);
        });
    }
})();

export default app;
