// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     verifyOtp: {
//         type: String,
//         default: ''
//     },
//     verifyOtpExpireAt: {
//         type: Number,
//         default: 0
//     },
//     isAccountVerified: {
//         type: Boolean,
//         default: true
//     },
//     resetOtp: { // used to reset the password
//         type: String,
//         default: ''
//     },
//     resetOtpExpireAt: {
//         type: Number,
//         default: 0
//     }
// })

// const User = mongoose.models.user || mongoose.model('User', userSchema)
// export default User








import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAccountVerified: {
        type: Boolean,
        default: false // after register it will be true
    },
    resetOtp: { // used to reset the password
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // This adds createdAt and updatedAt fields
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User