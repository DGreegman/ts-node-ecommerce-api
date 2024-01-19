import express, { Application, Request, Response, NextFunction } from 'express';
import Config from './config/app.config';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import './config/app.server';
import routerModule from './routes';

//Router Modules
import userRoute from './routes/user.routes';

// Load environmental variables only when on development environment
if (process.env.NODE_ENV !== 'production')
    configDotenv();

// Initializing server application
const app: Application = express();


// Application 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(`${Config.Server.url}`, routerModule) // API base route

// Routes
app.use(`${Config.Server.url}/user`, userRoute);

app.get('/', (req: Request, res: Response) => {
    res.redirect(`${Config.Server.url}`);
});


// Starting server
app.listen(Config.Server.port, () => console.log(`API service running on ${Config.Server.port}`));