import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app.config';

class Guard {

	constructor() { };

	/**
	 * Verify Customer token
	 */
	VERIFY_AUTH_TOKEN (req: Request, res: Response, next: NextFunction,){

		// Extraction of token from the request header
		const bearerHeader = req.headers['authorization'];

		// Header token validation
		if (typeof bearerHeader !== 'undefined') {
			const token = bearerHeader.split(' ')[1];

			// Checking authenticity of token
			jwt.verify(token, AppConfig.JWT_KEY, (err: any, payload: any) => {
				if (!err) {
					res.locals = payload;
					next();
				}
				else {
					switch (err.name) {

						// Expired token
						case 'TokenExpiredError': {
							err.message = 'Session expired!: Login and try again';
							res.status(403).json({
								status: false,
								message: err.message
							});
							break;
						}

						// Invalid token
						case 'JsonWebTokenError': {
							err.message = 'Invalid token!: Login and try again';
							res.status(401).json({
								status: false,
								message: err.message
							});
							break;
						}

						//Inactive token
						case 'NotBeforeError': {
							err.message = 'Inactive token!: Login and try again';
							res.status(401).json({
								status: false,
								message: err.message
							});
							break;
						}

						default:
							res.sendStatus(403);
							break;
					}
				}
			})
		} else {
			return res.status(401).json({
				status: false,
				message: 'Unauthorized: Authentication token required'
			});
		}
	}

	/**
	 * Issue authorization token
	 * @param {String|Buffer|object} payload - Payload data
	 * @param {string} key - JWT Secret key
	 * @return - Base64 string
	 */
	SIGN_AUTH_TOKEN (payload: object | string | Buffer, key: string) {
		return jwt.sign({ payload }, key, {
			expiresIn: '1d'
		});
	}
}

export default Guard;