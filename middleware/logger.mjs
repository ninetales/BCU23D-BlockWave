import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {

    const filePath = path.join(__appdir, 'logs', 'app.log');

    const message = `[${new Date().toLocaleDateString('sv-SE')} | ${new Date().toLocaleTimeString('sv-SE')}] - [${req.method}] ${req.originalUrl}\n`;

    fs.appendFileSync(filePath, message);

    next();

};

export default logger;