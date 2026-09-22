import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { body, validationResult } from 'express-validator'

const verifyJwt = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Unauthorized request, token is missing'
        })
    }

    try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedRefresh.id).select('+refreshToken');

        if (!user || !user.refreshToken || !(await user.isRefreshTokenCorrect(refreshToken))) {
            return res.status(401).json({
                message: 'Invalid refresh token'
            });
        }

        const newAccessToken = await user.generateAccessToken();
        res.setHeader('x-access-token', newAccessToken);

        req.user = user;
        return next();
    } catch (error) {
        console.error('ERROR:-\n', error?.stack || error);
        return res.status(401).json({
            message: 'Invalid or expired token',
        });
    }
}

async function validateResult(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const registeredUserValidationRules = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 4, max: 20 })
        .withMessage('Username must be between 4 and 20 characters'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validateResult
]

const loginUserValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validateResult
]

export { verifyJwt, registeredUserValidationRules, loginUserValidationRules }   