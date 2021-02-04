import express from 'express';
import urlRouter from './url.js';

import { createUrl } from '../controllers/url.js';

const router = express.Router();

router.post('/shorten', createUrl);

router.use('/url', urlRouter);

export default router;
