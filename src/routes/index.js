import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import UserRoutes from './user.js'
const router = express.Router()

router.use('/user',UserRoutes)

export default router