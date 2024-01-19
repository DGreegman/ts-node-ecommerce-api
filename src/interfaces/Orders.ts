import { Document, Types } from 'mongoose';
import { EPaymentMethods, ETransactionTypes } from './Transactions';


enum EStatus {
    PROCESSING = 'PROCESSING',
    ENROUTE = 'ENROUTE',
    DELLIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

interface IOrders extends Document {
    user: Types.ObjectId;
    quantity: number;
    amount: number;
    deliveryAddress: string;
    deliveryTime?: Date;
    deliveryFee?: number;
    totalFee: number;
    paymentMethod: EPaymentMethods;
    type: ETransactionTypes;
    status: EStatus;
};

export default IOrders;
export { EStatus }