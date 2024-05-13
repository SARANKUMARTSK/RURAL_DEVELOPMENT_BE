import AnnouncementModel from '../model/announcement.js'

const getAllAnnouncemet = async(req,res)=>{
    try {
        let announcement = await AnnouncementModel.find({})
        res.status(200).send({
            message:"Announcement data fetched successfully",
            announcement
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getAnnouncementById = async(req,res)=>{
    try {
        let announcement = await AnnouncementModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Announcement Data Fetched Successfully", 
            announcement
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        }) 
    }
}

const createAnnouncement = async(req,res)=>{
    try {
        let announcement = await AnnouncementModel.create(req.body)
        res.status(201).send({
            message:"Announcement Successfully Created", 
            announcement
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        }) 
    }
}

const editAnnouncement = async(req,res)=>{
    try {
        let data = req.body
        let announcement = await AnnouncementModel.findByIdAndUpdate({_id:req.params.id}, data, {new:true})
        res.status(200).send({
            message:"Announcement Data Edited Successfully",
            announcement
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        }) 
    }
}

const deleteAnnouncement = async(req,res)=>{
    try {
        let announcement =await AnnouncementModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Announcement Deleted Successfully", 
            announcement
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

export default {
    getAllAnnouncemet,
    getAnnouncementById,
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement
}