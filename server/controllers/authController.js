

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'
import transporter from '../config/nodemailer.js'
import {
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_TEMPLATE
} from '../config/emailTemplate.js'
//./path/to/enhanced-templates.js




// const register = async (req, res) => {
//     const { name, email, password } = req.body

//     if (!name || !email || !password) {
//         return res.status(400).json({ success: false, message: 'All fields are required' })
//     }

//     try {
//         const existingUser = await User.findOne({ email })

//         if (existingUser) {
//             return res.status(409).json({ success: false, message: "User already exists" })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const user = new User({ name, email, password: hashedPassword, isAccountVerified: true })
//         await user.save()

//         const token = jwt.sign(
//             {
//                 id: user._id,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: '7d',
//             }
//         )

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         })

//         // Send welcome email
//         // try {
//         //     // const mailOptions = {
//         //     //     from: process.env.SENDER_EMAIL,
//         //     //     to: user.email,
//         //     //     subject: 'Welcome to Our Platform!',
//         //     //     html: WELCOME_EMAIL_TEMPLATE
//         //     //         .replace("{{name}}", user.name)
//         //     //         .replace("{{email}}", user.email)
//         //     //     // html: 
//         //     // };

//         //     //     const mailOptions = { // obj
//         //     //     from: process.env.SENDER_EMAIL,
//         //     //     to: email, // it came from req.body
//         //     //     subject: "Welcome to our App!",
//         //     //     text: `Hi ${name},\n\nWelcome to our platform. Your email is successfully registered.\n\nRegards,\nTeam`
//         //     // }

//         //     //     await transporter.sendMail(mailOptions);

//         //     // const mailOptions = {
//         //     //         // from: process.env.SENDER_EMAIL,
//         //     //         // from: "soumyajitdas105@gmail.com",
//         //     //         from: {
//         //     //             name: 'Eco Quest',
//         //     //             address: process.env.SENDER_EMAIL
//         //     //         },
//         //     //         to: user.email,
//         //     //         subject: 'Welcome to Our Platform!',
//         //     //         html: WELCOME_EMAIL_TEMPLATE
//         //     //             .replace("{{name}}", user.name)
//         //     //             .replace("{{email}}", user.email)
//         //     //     };


//         //     const mailOptions = {
//         //         from: {
//         //             name: 'Eco Quest',
//         //             address: process.env.SENDER_EMAIL
//         //         },
//         //         to: user.email,
//         //         subject: 'Welcome to Eco Quest Jharkhand - Your Sustainable Tourism Journey Begins! 🌿',
//         //         html: WELCOME_EMAIL_TEMPLATE
//         //             .replace(/{{name}}/g, user.name || 'Explorer')  // Global replace + fallback
//         //             .replace(/{{email}}/g, user.email)
//         //     };

//         //     await transporter.sendMail(mailOptions);


//         // } catch (emailError) {
//         //     console.log('Email sending failed:', emailError);
//         //     // Don't fail registration if email fails
//         // }

//         // Return user data without password
//         const userData = {
//             id: user._id,
//             name: user.name,
//             email: user.email
//         }

//         res.status(201).json({
//             success: true,
//             message: "Registration successful",
//             user: userData
//         })
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message })
//     }
// }





const register = async (req, res) => {
    const { name, email, password, requestedRole } = req.body // Added requestedRole

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Determine role and approval status
        let role = "tourist"; // Default role
        let isApproved = true; // Default approved for tourists
        let userRequestedRole = null;

        // If user requests manager role
        if (requestedRole === "manager") {
            role = "tourist"; // Start as tourist
            userRequestedRole = "manager"; // Store requested role
            isApproved = false; // Pending admin approval
        }

        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            isAccountVerified: true,
            role: role,
            requestedRole: userRequestedRole,
            isApproved: isApproved
        })
        
        await user.save()

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d',
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Send welcome email (optional - uncomment if needed)
        // try {
        //     const mailOptions = {
        //         from: {
        //             name: 'Eco Quest',
        //             address: process.env.SENDER_EMAIL
        //         },
        //         to: user.email,
        //         subject: 'Welcome to Eco Quest - Your Journey Begins! 🌿',
        //         html: WELCOME_EMAIL_TEMPLATE
        //             .replace(/{{name}}/g, user.name || 'Explorer')
        //             .replace(/{{email}}/g, user.email)
        //     };
        //     await transporter.sendMail(mailOptions);
        // } catch (emailError) {
        //     console.log('Email sending failed:', emailError);
        // }

        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            requestedRole: user.requestedRole,
            isApproved: user.isApproved
        }

        // Different success messages based on role request
        let message = "Registration successful";
        if (requestedRole === "manager") {
            message = "Registration successful. Your manager role request is pending admin approval.";
        }

        res.status(201).json({
            success: true,
            message: message,
            user: userData
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}





const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            requestedRole: user.requestedRole,
            isApproved: user.isApproved,
            isAccountVerified: user.isAccountVerified
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userData
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        })

        return res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const isAuthenticated = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' })
        }

        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            isAccountVerified: user.isAccountVerified
        }

        return res.status(200).json({
            success: true,
            user: userData
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const sendResetOtp = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000 // 15 minutes

        await user.save()

        // const mailOptions = {
        //     from: {
        //         name: 'Your App Name',
        //         address: process.env.SENDER_EMAIL
        //     },
        //     to: user.email,
        //     subject: 'Password Reset OTP',
        //     html: PASSWORD_RESET_TEMPLATE
        //         .replace("{{otp}}", otp)
        //         .replace("{{email}}", user.email)
        // }

        const mailOptions = {
            from: {
                name: 'Eco Quest',
                address: process.env.SENDER_EMAIL
            },
            to: user.email,
            subject: 'Password Reset OTP',
            html: PASSWORD_RESET_TEMPLATE
                .replace("{{otp}}", otp)
                .replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOptions)
        console.log('Password reset email sent successfully to:', user.email);

        return res.status(200).json({ success: true, message: 'OTP sent to your email' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP and new password are required' })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0

        await user.save()

        return res.status(200).json({ success: true, message: 'Password reset successfully' })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export {
    register,
    login,
    logout,
    isAuthenticated,
    sendResetOtp,
    resetPassword
}




