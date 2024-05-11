import express from 'express';
import logger from './middleware/logger.mjs';
// import errorHandler from './middleware/errorHandler.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import ResponseModel from './utilities/ResponseModel.mjs';

const app = express();
const PORT = process.argv[2];
const MODE = process.env.NODE_ENV;

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// Middleware
app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);

app.all('*', (req, res, next) => {
    res.status(404).json(new ResponseModel({ data: { message: "No such URI" } }));
});

// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running in ${MODE} mode on port: ${PORT}`));