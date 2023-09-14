import express from 'express';
const router = express.Router();
import UserController from "../controllers/userController.js";
import passport from 'passport';
import passportConfig from '../config/passportConfig.js';
import jwt from 'jsonwebtoken'

//public route
router.post('/register' , UserController.userRegistration)
// with express nd jwt-- simple authentication
// router.post('/login' , UserController.userLogin)
router.post('/login', (req, res, next) => {
    passportConfig.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("here in login before")
        // If authentication succeeded, log the user in
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            // You can send a success response or redirect to a success page here
            const jwtToken = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY , { expiresIn : '5d'});
            return res.json({ message: 'Login successfulllllllllllll' , "token" :jwtToken });
        });
    })(req, res, next);
});
  
//private route

export default router;
