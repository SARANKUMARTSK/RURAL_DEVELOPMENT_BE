import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import UserRoutes from './src/routes/user.js'
import ComplaintRoutes from './src/routes/complaint.js'
import ContactRoutes from './src/routes/contact.js'
import DonationRoutes from './src/routes/donation.js'
import ProductRoutes from './src/routes/product.js'
import WasteRoutes from './src/routes/waste.js'
import AnnouncementRoutes from './src/routes/announcement.js'
import GalleryRoutes from './src/routes/gallery.js'
import WasteSalesRoutes from './src/routes/wasteSales.js'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.get('/images/:filename',async(req,res)=>{
   try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'src', 'images', filename);
    console.log(filepath);
    res.sendFile(filepath);
   } catch (error) {
    res.status(500).send({
        message: error.message || "Internal server error"
    });
   }
})
app.use("/user",UserRoutes)
app.use("/complaints",ComplaintRoutes)
app.use("/contacts",ContactRoutes)
app.use("/donations",DonationRoutes)
app.use("/products" , ProductRoutes)
app.use("/waste", WasteRoutes)
app.use("/announcement", AnnouncementRoutes)
app.use("/gallery", GalleryRoutes)
app.use("/agro-sales", WasteSalesRoutes)



app.listen(process.env.PORT,()=>console.log(`App is Running in ${process.env.PORT}`))