import { Request } from "express";

export type Bearer = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    isLoggedIn: boolean;
}

interface IPayload extends Request {
    bearer: Bearer
};

export { IPayload }