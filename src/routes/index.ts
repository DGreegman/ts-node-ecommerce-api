import { Router, Request, Response } from 'express';
import UserProfile from '../services/user.service';
import OrderModule from '../services/order.service';
import JWT_AUTH from '../middlewares/auth.middleware';

const user = new UserProfile;
const routerModule: Router = Router();
const order = new OrderModule();
const jwt = new JWT_AUTH();

/**API base route */
routerModule.get('', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the eCommerce API\nensure you read the API docs before you continue' })
});

// User Login
routerModule.post('/login', user.login);

// Order routes
routerModule.route('/orders')

    // Order history
    .get(jwt.VERIFY_AUTH_TOKEN)

    // Place an order
    .post(jwt.VERIFY_AUTH_TOKEN, order.create);


    // Transaction history
    routerModule.get('/transactions');

export default routerModule;