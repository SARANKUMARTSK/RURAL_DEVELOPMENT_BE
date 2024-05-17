import ProductModel from '../model/product.js'
import multer from 'multer'

const getAllProducts = async(req,res)=>{
    try {
        let product = await ProductModel.find({})
        res.status(200).send({
            message:"Products Data Fetched Successfully",
            product
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getProductById = async(req,res)=>{
    try {
        let product = await ProductModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Product Data Fetched Successfully", 
            product
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./src/images');
    },
    filename :function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const createProduct = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err){
            if(err instanceof multer.MulterError){
                return res.status(500).send({message:"Multer Error Occured"})
            }else if(err){
                return res.status(500).send({ message: 'Unknown error occurred' });
            }
        
        let product = await ProductModel.create({
            name:req.body.name,
            email:req.body.email,
            userId : req.body.userId,
            phoneNumber:req.body.phoneNumber , 
            product:req.body.product , 
            description:req.body.description, 
            quantity:req.body.quantity , 
            unit:req.body.unit , 
            price:req.body.price,
            locality:req.body.locality, 
            city:req.body.city, 
            district:req.body.district , 
            state:req.body.state , 
            imageFile :req.file.filename
        });
        res.status(201).send({
            message: "Product Created Successfully",
            product
        });})
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editProduct = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err){
            if(err instanceof multer.MulterError){
                return res.status(500).send({message:"Multer Error Occured"})
            }else if(err){
                return res.status(500).send({ message: 'Unknown error occurred' });
            }
        
        let product = await ProductModel.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            userId : req.body.userId,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber , 
            product:req.body.product , 
            description:req.body.description, 
            quantity:req.body.quantity , 
            unit:req.body.unit , 
            price:req.body.price,
            locality:req.body.locality, 
            city:req.body.city, 
            district:req.body.district , 
            state:req.body.state , 
            imageFile :req.file.filename,
            status:req.body.status
        });
        res.status(201).send({
            message: "Product Edited Successfully",
            product 
        });})
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteProduct = async(req,res)=>{
    try {
        let product = await ProductModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Product Data Deleted Successfully", 
            product
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getProductByCity = async(req,res)=>{
    try {
        let products = await ProductModel.find({city:req.query.city})
        res.status(200).send({
            message:"Product Data Fetched Successfully",
            products
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    getProductByCity
}