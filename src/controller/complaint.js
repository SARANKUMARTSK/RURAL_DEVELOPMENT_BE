import ComplaintModel from '../model/complaint.js'
import UserModel from '../model/user.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
import multer from 'multer'
import Auth from '../utils/auth.js'



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

const getComplaintByReferenceLink = async(req,res)=>{
    try {
        let complaint = await ComplaintModel.findOne({referenceLink:req.params.referenceLink})
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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });


  const upload = multer({ storage: storage });

const createComplaint = async (req, res) => {
    try {
        
        let user = await UserModel.findOne({ _id: req.params.id });
        if(user){
            upload.single('imageFile')(req,res,async function(err){
                if(err instanceof multer.MulterError){
                    return res.status(500).send({message:"Multer Error Occured"})
                }else if(err){
                    return res.status(500).send({ message: 'Unknown error occurred' });
                }
            
           
            let complaint = await ComplaintModel.create({
                userName:req.body.userName,
                userEmail:req.body.userEmail,
                userPhoneNumber:req.body.userPhoneNumber , 
                userId:req.body.userId , 
                locality:req.body.locality, 
                pincode:req.body.pincode,
                city:req.body.city , 
                district:req.body.district ,  
                state:req.body.state,
                department:req.body.department, 
                title:req.body.title, 
                description:req.body.description , 
                imageFile :req.file.filename
            });
            sendMail(complaint);

            res.status(201).send({
                message: "Complaint Registered Successfully",
                complaint
            });})
        
        }else{
            res.status(404).send({
                message:"Opps...Only Registered User Can Create Complaint"
            })
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
            to: [complaint.userEmail],
            subject: "Complaint Registration",
            html: `<div>
                <h1>Your Complaint has been successfully Resitered</h1>
                <a href="effervescent-banoffee-bf65cb.netlify.app/your-complaints/${complaint.userId}">Track Complaint</a>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message || error);
    }
};

const sendMailForStatus = async (updatedComplaint) => {
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
            to: [updatedComplaint.userEmail],
            subject: "Complaint Status Update",
            html: `<div>
                <h1>Your Complaint Status has been Updated .  </h1>
                <a href="effervescent-banoffee-bf65cb.netlify.app/your-complaints/${updatedComplaint.userId}">Track Complaint</a>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message || error);
    }
};

const editComplaint = async (req, res) => {
    try {
        let complaint = await ComplaintModel.findOne({ _id: req.params.id });

        if (complaint) {
    
            upload.single('imageFile')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send({ message: "Multer Error Occurred" });
                } else if (err) {
                    return res.status(500).send({ message: 'Unknown error occurred' });
                }

                 
                let imageFileName = req.file ? req.file.filename : complaint.imageFile || "";

                let updatedComplaint = await ComplaintModel.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPhoneNumber: req.body.userPhoneNumber,
                        userId: req.body.userId,
                        locality: req.body.locality,
                        city: req.body.city,
                        pincode: req.body.pincode,
                        district: req.body.district,
                        state: req.body.state,
                        status: req.body.status,
                        assignedTo: req.body.assignedTo,
                        assignedContact:req.body.assignedContact,
                        assignedEmail:req.body.assignedEmail,
                        assignedDate:req.body.assignedDate,
                        expectedDate:req.body.expectedDate,
                        completionDate:req.body.completionDate,
                        department: req.body.department,
                        title: req.body.title,
                        description: req.body.description,
                        imageFile: imageFileName
                    },
                    { new: true } 
                ); 

                if(req.body.status){
                    sendMailForStatus(updatedComplaint)
                }
 
                res.status(201).send({
                    message: "Complaint Edited Successfully",
                    complaint: updatedComplaint
                });
            });
        } else {
            res.status(404).send({
                message: "Oops...Only Registered User Can Edit Complaint"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};




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

const getComplaintById = async(req,res)=>{
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

const getComplaintByUser = async(req,res)=>{
    try {
        let complaints = await ComplaintModel.find({userId:req.params.id})
        res.status(200).send({
            message:"Complaints Fetched Successfully",
            complaints
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}



export default {
    getAllComplaints,
    getComplaintByReferenceLink,
    createComplaint,
    editComplaint,
    deleteComplaint,
    getComplaintById,
    getComplaintByUser
}