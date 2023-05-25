require('dotenv').config({path: '../.env'});
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/router';
import errorMiddleware from './middlewares/error-middleware';

const PORT = Number(process.env.PORT) || 4000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        app.listen(PORT, HOSTNAME, () => console.log(`Server started on ${HOSTNAME}:${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

void start();