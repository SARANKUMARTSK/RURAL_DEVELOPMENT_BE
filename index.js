import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import UserRoutes from './src/routes/user.js'
import ComplaintRoutes from './src/routes/complaint.js'

dotenv.config()
const app = express();
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send(
        `<div style="background-color: black; color: white; padding: 15px; text-align: center; ">
             <h1>Welcome to Rural Development Application </h1>
        </div>`
    )
})

app.use("/user",UserRoutes)
app.use("/complaints",ComplaintRoutes)




app.listen(process.env.PORT,()=>console.log(`App is Running in ${process.env.PORT}`))