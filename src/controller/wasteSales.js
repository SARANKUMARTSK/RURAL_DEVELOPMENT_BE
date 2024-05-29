import WasteSalesModel from "../model/wasteSales.js"
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

const getAllWasteSales = async(req,res)=>{
    try {
        let wasteSales = await WasteSalesModel.find({})
        res.status(200).send({
            message:"Waste Sales Records Fetched Successfully",
            wasteSales
        })
    } catch (error) {
       res.status(500).send({
        message:error.message||"Internal Server Error"
       }) 
    }
}

const getWasteSalesById = async(req,res)=>{
    try {
        let wasteSales = await WasteSalesModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Waste Sales Successfully Fetched",
            wasteSales
        }) 
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
           }) 
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });


  const upload = multer({ storage: storage });


const createSalesWaste = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err)  {
            if (err instanceof multer.MulterError) {
                return res.status(500).send({ message: "Multer error occurred." });
            } else if (err) {
                return res.status(500).send({ message: "Unknown error occurred." });
            }
        const wasteSales = await WasteSalesModel.create({
          name:req.body.name,
          email:req.body.email , 
          phoneNumber:req.body.phoneNumber, 
          title:req.body.title ,
          description:req.body.description, 
          district:req.body.district,
          city:req.body.city,
          quantity:req.body.quantity,
          price:req.body.price, 
          imageFile:req.file.filename
        });
        res.status(201).send({
            message:"Waste Sales Added Successfully",
            wasteSales
        })
    })

    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
           }) 
    } 
}

const editSalesWaste = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err)  {
            if (err instanceof multer.MulterError) {
                return res.status(500).send({ message: "Multer error occurred." });
            } else if (err) { 
                return res.status(500).send({ message: "Unknown error occurred." });
            }
        const wasteSales = await WasteSalesModel.findByIdAndUpdate({_id:req.params.id},{
          name:req.body.name, 
          email:req.body.email , 
          phoneNumber:req.body.phoneNumber, 
          title:req.body.title ,
          description:req.body.description, 
          district:req.body.district,
          city:req.body.city,
          quantity:req.body.quantity,
          price:req.body.price,  
          imageFile:req.file.filename
        });
        res.status(201).send({
            message:"Waste Sales Added Successfully",
            wasteSales
        })
    })

    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
           }) 
    }
}

const deleteWasteSales = async(req,res)=>{
    try {
        let wasteSales = await WasteSalesModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"waste Sales Deleted Successfully",
            wasteSales
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
           })
    }
}





export default {
    getAllWasteSales,
    getWasteSalesById,
    createSalesWaste,
    editSalesWaste,
    deleteWasteSales,
    
}