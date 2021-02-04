import app from '../app.js';

import Url from '../models/Url.js';

export async function createUrl(req, res) {
    try {
        const { url, short } = req.body;

        if (!url) return res.sendStatus(400);

        if (short && (await Url.findOne({ short }).exec()))
            return res.status(409).json({ error: 'URL already exists' });

        const urlData = {
            url,
            short: short ?? generateUrl(),
        };

        while (await Url.findOne({ short: urlData.short }).exec())
            urlData.short = generateUrl();

        const urlDoc = new Url(urlData);

        await urlDoc.save();

        addUrlRoute(urlData);

        res.json(urlData);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getUrls(req, res) {
    const urls = await Url.find({});

    res.json(urls);
}

export async function getUrl(req, res) {
    try {
        const { id } = req.params;

        const url = await Url.find({ _id: id });

        if (url.length === 0)
            return res.status(400).json({ error: 'URL has been deleted' });

        res.json(url);
    } catch (err) {
        res.status(400).json({ error: 'URL not found' });
    }
}

export async function deleteUrl(req, res) {
    try {
        const { id } = req.params;

        const url = await Url.findByIdAndDelete(id);

        res.json(url);
    } catch (err) {
        res.status(400).json({ error: 'URL not found' });
    }
}

function generateUrl() {
    const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length,
        length = 8;

    let url = '';

    for (let i = 0; i < length; i++)
        url += characters.charAt(Math.floor(Math.random() * charactersLength));

    return url;
}

function addUrlRoute({ url, short }) {
    app.use(`/${short}`, (req, res) => {
        res.redirect(301, url);
    });
}
