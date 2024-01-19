import express, { Application, Request, Response } from 'express';
import AppConfig from './config/app.config';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import './config/app.server';
import routerModule from './routes';

//Router Modules
import userRoute from './routes/user.routes';
import helmet from 'helmet';

// Load environmental variables only when on development environment
if (process.env.NODE_ENV !== 'production')
    configDotenv();

// Initializing server application
const app: Application = express();

// Application
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '["3.134.238.10","3.129.111.220","52.15.118.168", "127.0.0.1:5120"]' }));
app.use(helmet());
app.use(`${AppConfig.server.url}`, routerModule) // API base route

// Routes
app.use(`${AppConfig.server.url}/user`, userRoute);

app.get('/', (req: Request, res: Response) => {
    res.redirect(`${AppConfig.server.url}`);
});

// Starting server
app.listen(AppConfig.server.port, () => console.log(`API service running on ${AppConfig.server.port}`));