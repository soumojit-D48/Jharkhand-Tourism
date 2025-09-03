import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const userAuth = async (req, res, next) => {
    const {token} = req.cookies

    if(!token) {
        return res.status(401).json({success: false, message: 'Not Authorized. Login Again'})
    }

    try {
        const DecodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(DecodedToken?.id).select('-password')

        if(!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        } // If the user was deleted, token is invalid — block access.

        req.user = user // attach full user obj
        next() // pass to to the controller func
    } catch (error) {
        res.status(401).json({ success: false, message: error.message})
    }
}

export default userAuth