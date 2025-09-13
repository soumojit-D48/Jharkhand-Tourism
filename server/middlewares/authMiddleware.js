// import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js'

// const userAuth = async (req, res, next) => {
//     const {token} = req.cookies

//     if(!token) {
//         return res.status(401).json({success: false, message: 'Not Authorized. Login Again'})
//     }

//     try {
//         const DecodedToken = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await User.findById(DecodedToken?.id).select('-password')

//         if(!user) {
//             return res.status(404).json({ success: false, message: 'User not found' })
//         } // If the user was deleted, token is invalid — block access.

//         req.user = user // attach full user obj
//         next() // pass to to the controller func
//     } catch (error) {
//         res.status(401).json({ success: false, message: error.message})
//     }
// }

// export default userAuth




import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            const user = await User.findById(tokenDecode.id)
            
            if (!user) {
                return res.status(401).json({ success: false, message: 'Unauthorized: User not found' })
            }

            req.user = user
            next()
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' })
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' })
    }
}

export default userAuth














// import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js'

// const userAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token

//         if (!token) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Access denied. No token provided.' 
//             })
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findById(decoded.id)

//         if (!user) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid token. User not found.' 
//             })
//         }

//         // Attach user to request object
//         req.user = user
//         next()
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid token.' 
//             })
//         } else if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Token expired.' 
//             })
//         }
        
//         return res.status(500).json({ 
//             success: false, 
//             message: 'Server error during authentication.' 
//         })
//     }
// }

// export default userAuth