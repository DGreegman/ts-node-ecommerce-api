import { Schema, model } from "mongoose";
import IOrders, { EStatus } from "../interfaces/order.interface";
import { EPaymentMethods, ETransactionTypes } from "../interfaces/transaction.interface";

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    deliveryAddress: {
        type: String,
        required: true
    },

    deliveryTime: Date,
    deliveryFee: Number,

    totalFee: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: Object.values(EPaymentMethods),
        default:EPaymentMethods.WALLET
    },

    type: {
        type: String,
        enum: Object.values(ETransactionTypes),
        default: ETransactionTypes.PURCHASE,
        required: true
    },

    status:{
        type: String,
        enum: Object.values(EStatus),
        default: EStatus.PROCESSING
    }
},{timestamps:true});

const Orders = model<IOrders>('Orders', orderSchema, 'Purchases');
export default Orders;