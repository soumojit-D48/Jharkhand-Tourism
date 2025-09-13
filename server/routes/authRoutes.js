// import express from 'express'
// import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, varifyedEmail } from '../controllers/authController.js'
// import userAuth from '../middlewares/authMiddleware.js'

// const authRouter = express.Router()

// authRouter.post('/register', register)
// authRouter.post('/login', login)
// authRouter.post('/logout', logout)
// authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
// authRouter.post('/verify-account', userAuth, varifyedEmail)
// authRouter.get('/is-auth', userAuth, isAuthenticated)
// authRouter.post('/send-reset-otp', sendResetOtp)
// authRouter.post('/reset-password',resetPassword)


// export default authRouter





// import express from 'express'
// import { 
//     isAuthenticated, 
//     login, 
//     logout, 
//     register, 
//     resetPassword, 
//     sendResetOtp, 
//     sendVerifyOtp, 
//     verifyEmail // Fixed import name
// } from '../controllers/authController.js'
// import userAuth from '../middlewares/authMiddleware.js'

// const authRouter = express.Router()

// authRouter.post('/register', register)
// authRouter.post('/login', login)
// authRouter.post('/logout', logout)
// authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
// authRouter.post('/verify-email', userAuth, verifyEmail) // Fixed route name and function
// authRouter.get('/is-auth', userAuth, isAuthenticated)
// authRouter.post('/send-reset-otp', sendResetOtp)
// authRouter.post('/reset-password', resetPassword)

// export default authRouter









import express from 'express'
import {
    register,
    login,
    logout,
    isAuthenticated,
    sendResetOtp,
    resetPassword
} from '../controllers/authController.js'
import userAuth from '../middlewares/authMiddleware.js'

const authRouter = express.Router()

// Public routes
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)

// Protected routes
authRouter.post('/logout', userAuth, logout)
authRouter.get('/is-auth', userAuth, isAuthenticated)

export default authRouter