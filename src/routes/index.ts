import { Router, Request, Response } from 'express';
import UserProfile from '../services/user.service';
import Guard from '../middlewares/auth.middleware';

const user = new UserProfile;
const routerModule: Router = Router();

/**API base route */
routerModule.get('', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the eCommerce API<br>ensure you read the API docs before you continue' })
});

// User Login
routerModule.post('/login', user.login);

// Transaction history
routerModule.get('/transactions');

export default routerModule;