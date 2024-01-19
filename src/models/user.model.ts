import { Schema, model } from "mongoose";
import IUser, { ICategory } from "../interfaces/Users";
import IGasCylinder from "../interfaces/GasCylinder";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    telephone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        maxlength: [14, 'phone number exceeds maximum length'],
        validate: {
            validator: function (tel: string) {
                return /^([+/.])\d{13}$/.test(tel);
            },
            message: "{VALUE} isn\'t a valid phone number"
        }
    },
    stateResidence: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function (data: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
            },
            message: "{VALUE} is not a valid email address",
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    Cylinders: Array<IGasCylinder>,
    password: {
        type: String,
        minlength: [6, 'Password too short']
    },
    homeAddress: {
        type: String,
        required: true
    },
    referralID: String,
    pin: String,
    vCode: String,
    userType: {
        type: String,
        enum: Object.values(ICategory),
        default: ICategory.HOUSEHOLD
    },
    walletBalance: {
        type:Number,
        default: 0.00
    }
}, { timestamps: true });


const Users = model<IUser>("Users", userSchema, 'Customers');
export default Users