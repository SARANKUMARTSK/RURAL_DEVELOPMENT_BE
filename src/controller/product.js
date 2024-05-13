import ProductModel from '../model/product.js'

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

const createProduct = async(req,res)=>{
    try {
        let product = await ProductModel.create(req.body)
        res.status(201).send({
            message:'Product Created Successfully', 
            product
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editProduct = async(req,res)=>{
    try {
        let data = req.body
        let product = await ProductModel.findByIdAndUpdate({_id:req.params.id},data , {new:true})
        res.status(200).send({
            message:"Product Data Edited Successfully" , 
            product
        })
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


export default {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}