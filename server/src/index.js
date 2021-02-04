import app from './app.js';

const port = Number(process.env.SERVER_PORT) || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
