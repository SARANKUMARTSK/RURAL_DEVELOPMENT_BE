import { get } from 'mongoose'
import WasteModel from '../model/waste.js'


const getAllWaste = async(req,res)=>{
    try {
        let waste = await WasteModel.find({})
        res.status(200).send({
            message:"Waste Data Fetched Successfully",
            waste
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getWasteById = async(req,res)=>{
    try {
        let waste = await WasteModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Waste Data Fetched Successfully", 
            waste
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createWaste = async(req,res)=>{
    try {
        let waste = await WasteModel.create(req.body);
        res.status(201).send({
            message:"Waste data created successfully",
            waste
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editWasteDetail = async(req,res)=>{
    try {
        let data = req.body
        let waste = await WasteModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        res.status(200).send({
            message:"Waste data edited successfully",
            waste
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteWasteDetail  = async(req,res)=>{
    try {
        let waste = await WasteModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Waste Data Deleted Successfully", 
            waste
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

export default {
    getAllWaste,
    getWasteById,
    createWaste,
    editWasteDetail,
    deleteWasteDetail
}