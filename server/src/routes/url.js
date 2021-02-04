import express from 'express';

import { createUrl, getUrl, getUrls, deleteUrl } from '../controllers/url.js';

const router = express.Router();

router.get('/', getUrls);

router.get('/:id', getUrl);

router.delete('/:id', deleteUrl);

router.post('/', createUrl);

export default router;
