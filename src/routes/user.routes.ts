import express, { Router } from 'express';
import UserProfile from '../controllers/user.module';
import JWT_AUTH from '../middlewares/auth.middleware';

const userRoute: Router = express.Router();
const user = new UserProfile;
const auth = new JWT_AUTH;

/**
 * Handling user profile operations
 */

userRoute
    .route('/')

    // Renders the user profile information
    .get(auth.VERIFY_AUTH_TOKEN, user.profileInfo)

    // Updates user profile information
    .patch(auth.VERIFY_AUTH_TOKEN, user.updateProfile)

    // Delete account
    .delete(auth.VERIFY_AUTH_TOKEN, user.deleteAccount);

// User registration
userRoute.post('/register', user.create);

userRoute
    .route('/register/:id')

    // Validate verification code
    .post(user.verify)

    // Complete the registration
    .patch(user.updateProfile);

export default userRoute;