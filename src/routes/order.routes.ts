import express, { Router } from 'express';
import Purchases from '../services/order.service';
import Guard from '../middlewares/auth.middleware';

// @Injectables
const orderRoute: Router = express.Router();
const order = new Purchases();
const guard = new Guard();

orderRoute
  .route('/')

  //Place an order
  .post(guard.VERIFY_AUTH_TOKEN, order.place)

  // Order History
  .get(guard.VERIFY_AUTH_TOKEN, order.list)

export default orderRoute;