import { Document, Types } from 'mongoose';

export interface ICylinder {
    alias?: string;
    owner: Types.ObjectId;
    size: number;
    level: number;
}

interface IGasCylinder extends ICylinder, Document { };

export default IGasCylinder;