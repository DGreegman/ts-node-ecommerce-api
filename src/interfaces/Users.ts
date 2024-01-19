import { Document, Types } from 'mongoose';
import IGasCylinder from './GasCylinder';

export enum ICategory {
    HOUSEHOLD = 'HOUSEHOLD',
    COMMERCIAL = 'COMMERCIAL'
}

interface IUser extends Document {
    firstName?: string;
    lastName?: string;
    telephone: string;
    homeAddress: string;
    stateResidence: string;
    email?: string;
    userType: ICategory;
    GasCylinder: [IGasCylinder];
    pin: string;
    password?: string;
    referralID?: string;
    vCode?:string;
}

export default IUser;