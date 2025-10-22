import 'dotenv/config'
import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
// import dotenv from "dotenv"
// import dotenv from "dotenv"


import cofigureCors from "./config/corsConfig.js"
import connectDB from "./config/dbConnect.js"
import authRouter from "./routes/authRoutes.js"
// import userRouter from "./routes/userRoutes.js"
import AiRouter from "./routes/aiRoute.js"
import adminRouter from "./routes/adminRoutes.js"
import hotelRouter from './routes/hotelRoutes.js'

// dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000
connectDB()

app.use(cors(cofigureCors()))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => res.send('api working fine'))
app.use('/api/auth', authRouter)
// app.use('/api/user', userRouter)
app.use('/api/ai', AiRouter)
app.use('/api/admin', adminRouter)
app.use('/api/hotels', hotelRouter)



// Error handling middleware

// app.use((err, req, res, next) => {
//     console.error('Error:', err.stack)
//     res.status(500).json({ 
//         success: false, 
//         message: 'Something went wrong!',
//         ...(process.env.NODE_ENV === 'development' && { error: err.message })
//     })
// })

// // Handle undefined routes
// app.use('*', (req, res) => {
//     res.status(404).json({ 
//         success: false, 
//         message: `Route ${req.originalUrl} not found` 
//     })
// })

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
