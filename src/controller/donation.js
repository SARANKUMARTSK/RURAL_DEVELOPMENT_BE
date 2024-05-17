import DonationModel from '../model/donation.js'
import multer from 'multer'

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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });


  const upload = multer({ storage: storage });

const createDonation = async(req,res)=>{
    try {
        upload.single('imageFile')(req,res,async function(err){
            if(err instanceof multer.MulterError){
                return res.status(500).send({message:"Multer Error Occured"})
            }else if(err){
                return res.status(500).send({ message: 'Unknown error occurred' });
            }
       
        let announcement = await DonationModel.create({
            from:req.body.from,
            to:req.body.to,
            title:req.body.title , 
            endingDate:req.body.endingDate , 
            description:req.body.description, 
            imageFile :req.file.filename
        });

        res.status(201).send({
            message: "Complaint Registered Successfully",
            announcement
        });})
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
