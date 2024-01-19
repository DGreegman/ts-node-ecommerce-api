import { Request, Response } from "express";
import mongoose from "mongoose";
import Transactions from '../models/transaction.model';
import Orders from "../models/order.model";
import Users from "../models/user.model";
import IOrders from "../interfaces/Orders";

class OrderModule {


    constructor() { }

    // Placing new orders
    async create(req: Request, res: Response) {

        const userID = res.locals.payload._id;
        const { }: IOrders = req.body;

        // Initializing transaction
        // const session = await mongoose.startSession();

        try {
            // Get wallet balance
            const wallet: Buffer | any = await Users.findById(userID, {
                walletBalance: 1
            }).exec();

            // Compare total price with wallet balance
            let currentBalance = parseInt(wallet.walletBalance) - parseInt(req.body.totalFee);

            if (currentBalance >= 0) {

                // update wallet balance
                await Users.findByIdAndUpdate(userID, {
                    $set: {
                        walletBalance: currentBalance
                    }
                }).then(async (): Promise<void> => {

                    // Log Order
                    await Orders.create({
                        user: userID,
                        ...req.body
                    }).then(async (order: Buffer | any) => {

                        // Log transaction
                        await Transactions.create({
                            type: order.type,
                            paymentMethod: order.paymentMethod,
                            amount: order.totalFee,
                            txRef: order._id,
                            user: order.user
                        });


                        // Complete transaction
                        return res.status(201).json({
                            status: true,
                            message: 'Order Placed'
                        });
                    }).catch((e: any) => {
                        return res.status(409).json({
                            status: false,
                            message: 'Invalid payment method'
                        });

                    }).catch((e: any) => {
                        return res.status(409).json({
                            status: false,
                            message: 'Invalid payment method'
                        });
                    });
                });

            } else {
                return res.status(406).json({
                    status: false,
                    message: 'Insufficient balance'
                })
            }
        } catch (e: any) {
            return res.status(501).json({
                status: false,
                message: `${e.name}: Null value`
            });
        }
    };

    // Funding of wallet
    async fundWallet(req: Request, res: Response) { }

    // View all 
    async list(req: Request, res: Response) { }
};

export default OrderModule;