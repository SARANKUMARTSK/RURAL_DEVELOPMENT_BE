import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import AppRoutes from './src/routes/index.js'
const app = express();
app.use(cors());
app.use(express.json())
app.use(AppRoutes)
app.listen(process.env.PORT,()=>console.log(`App is Running in ${process.env.PORT}`))