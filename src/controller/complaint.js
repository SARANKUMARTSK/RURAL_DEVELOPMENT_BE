import ComplaintModel from '../model/complaint.js'
import UserModel from '../model/user.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
 
  const upload = multer({ storage: storage });


const getAllComplaints = async(req,res)=>{
    try {
        let complaint = await ComplaintModel.find({})
        res.status(200).send({
            message:"Complaints data fetched successfully", 
            complaint
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getComplaintByid = async(req,res)=>{
    try {
        let complaint = await ComplaintModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Complaint Data Fetched Successfully",
            complaint
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createComplaint = async (req, res) => {
    try {
        
        let user = await UserModel.findOne({ _id: req.body.userId });
        if (user) {
            upload.single('imageFile')(req,res,async function(err){
                if(err instanceof multer.MulterError){
                    return res.status(500).send({message:"Multer Error Occured"})
                }else if(err){
                    return res.status(500).send({ message: 'Unknown error occurred' });
                }
            })
            let complaint = await ComplaintModel.create({
                userName:req.body.userName,
                userEmail:req.body.userEmail,
                userPhoneNumber:req.body.userPhoneNumber , 
                userId:req.body.userId , 
                locality:req.body.locality, 
                city:req.body.city , 
                district:req.body.district , 
                state:req.body.state,
                department:req.body.department, 
                title:req.body.title, 
                description:req.body.description , 
                complaintImage:req.file.filename
            });
            sendMail(complaint);

            res.status(201).send({
                message: "Complaint Registered Successfully",
                complaint
            });
        } else {
            res.status(404).send({
                message: "Only Registered Users Can Raise a Complaint"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};

const sendMail = async (complaint) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: {
                name: "RURAL_DEVELOPMENT_APP",
                address: process.env.USER_MAIL
            },
            to: ["sarankumartsk72726@gmail.com"],
            subject: "Complaint Reference Link",
            html: `<div>
                <h1>Please Save This Link to Track Your Complaint</h1>
                <p>${complaint.referenceLink}</p>
                <a href="https://effervescent-banoffee-bf65cb.netlify.app/track-complaint/${complaint.referenceLink}">Track Complaint</a>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message || error);
    }
};

const editComplaint = async(req,res)=>{
    try {
        let complaint = await ComplaintModel.findOne({_id:req.params.id})
        if(complaint){
            upload.single('imagefile')(req,res,async (err)=>{
                if (err) {
                    if (err instanceof multer.MulterError) {
                      return res.status(500).send({ message: 'Multer error occurred' });
                    } else {
                      return res.status(500).send({ message: 'Unknown error occurred' });
                    }
                  }
            })
            if(req.file){
                updateData.imageFile = req.file.filename;
            }
            let data = req.body
             let edited = await ComplaintModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
             res.status(200).send({
                message:"Complaint Edited Successfully",
                edited
             })
        }else{
            res.status(404).send({
                message:"Error While Editing Complaint"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteComplaint = async(req,res)=>{
    try {
        let complaint = await ComplaintModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Complaint Successfully Deleted",
            complaint
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


export default {
    getAllComplaints,
    getComplaintByid,
    createComplaint,
    editComplaint,
    deleteComplaint
}