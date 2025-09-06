import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
// import dotenv from "dotenv"
import "dotenv/config"


import cofigureCors from "./config/corsConfig.js"
import connectDB from "./config/dbConnect.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import AiRouter from "./routes/aiRoute.js"

// dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000
connectDB()

app.use(cors(cofigureCors()))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => res.send('api working fine'))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/ai', AiRouter)

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
