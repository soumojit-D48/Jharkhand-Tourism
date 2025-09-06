import express from 'express'
import { chatWithAi } from '../controllers/aiController.js'

const AiRouter = express.Router()

AiRouter.post('/chat', chatWithAi)

export default AiRouter
