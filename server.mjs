import express from 'express';
import logger from './middleware/logger.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import memberRouter from './routes/member-routes.mjs';
import ErrorRespModel from './utilities/ErrorResponseModel.mjs';

const app = express();
const PORT = process.argv[2];
const MODE = process.env.NODE_ENV;

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// Middleware
app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/members', memberRouter);

app.all('*', (req, res, next) => {
    next(new ErrorRespModel(`Unable to find resource ${req.originalUrl}`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running in ${MODE} mode on port: ${PORT}`));