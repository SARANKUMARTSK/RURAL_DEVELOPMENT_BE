import DonationModel from '../model/donation.js'

const getAllDonations = async(req,res)=>{
    try {
        let donation = await DonationModel.find({})
        res.status(200).send({
            message:"Donations Data Fetched Successfully", 
            donation
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getDonationById = async(req,res)=>{
    try {
        let donation = await DonationModel.finOne({_id:req.params.id})
        res.status(200).send({
            message:"Donation Data Fetched Successfully" , 
            donation
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createDonation = async(req,res)=>{
    try {
        let donation = await DonationModel.create(req.body);
        res.status(201).send({
            message:"Donation Submitted Successfully", 
            donation
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editDonation = async(req,res)=>{
    try {
        let data = req.body;
        let donation = await DonationModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        res.status(200).send({
            message:"Donation Data Edited Successfully", 
            donation
        })

    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteDonation = async(req,res)=>{
    try {
        let donation = await DonationModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Donation Data Deleted Successfully",
            donation
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

export default {
    getAllDonations,
    getDonationById,
    createDonation,
    editDonation,
    deleteDonation
}
