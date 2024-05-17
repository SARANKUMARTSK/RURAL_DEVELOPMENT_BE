import AnnouncementModel from '../model/announcement.js'
import multer from 'multer'

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
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });


  const upload = multer({ storage: storage });
const createAnnouncement = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err){
            if(err instanceof multer.MulterError){
                return res.status(500).send({message:"Multer Error Occured"})
            }else if(err){
                return res.status(500).send({ message: 'Unknown error occurred' });
            }
       
        let announcement = await AnnouncementModel.create({
            from:req.body.from,
            to:req.body.to,
            title:req.body.title , 
            endingDate:req.body.endingDate , 
            description:req.body.description, 
            imageFile :req.file.filename
        });

        res.status(201).send({
            message: "Announcement Successfully",
            announcement
        });})
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