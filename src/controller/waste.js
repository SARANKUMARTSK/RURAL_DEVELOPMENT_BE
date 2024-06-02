import WasteModel from '../model/waste.js'
import UserModel from '../model/user.js'
import multer from 'multer';
import dotenv from 'dotenv';    
dotenv.config();
import nodemailer from 'nodemailer'


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

const getWasteByReferenceLink = async(req,res)=>{
    try {
        let waste = await WasteModel.findOne({referenceLink:req.params.referenceLink})
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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });


  const upload = multer({ storage: storage });


  const createWaste = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ message: "Only registered users can create a complaint." });
        }

        upload.single('imageFile')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).send({ message: "Multer error occurred." });
            } else if (err) {
                return res.status(500).send({ message: "Unknown error occurred." });
            }
          
            try {
                let waste = await WasteModel.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    userId: req.body.userId,
                    type: req.body.type,
                    quantity: req.body.quantity,
                    description: req.body.description, 
                    locality: req.body.locality,
                    city: req.body.city,
                    district: req.body.district,
                    imageFile: req.file.filename
                });

                await sendMail(waste);

                res.status(201).send({
                    message: "Waste query registered successfully.",
                    waste
                });
            } catch (createError) {
                res.status(500).send({ message: createError.message || "Internal server error." });
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Internal server error." });
    }
};


const sendMail = async (waste) => {
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
            to: [waste.email],
            subject: "Waste Query Reference Link",
            html: `<div>
                <h1>Please Save This Link to Track Your Waste Query</h1>
                <p>${waste.referenceLink}</p>
                <a href="effervescent-banoffee-bf65cb.netlify.app/your-waste/${waste.userId}">Track Complaint</a>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message || error);
    }
};

const sendMailForStatus = async (updatedQuery) => {
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
            to: [updatedQuery.email],
            subject: "Complaint Status Update",
            html: `<div>
                <h1>Your Query Status has been Updated .  </h1>
                <a href="effervescent-banoffee-bf65cb.netlify.app/your-queries/${updatedQuery.userId}">Track Complaint</a>
            </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message || error);
    }
};




const editWasteDetail = async(req,res)=>{
    try {
        let waste = await WasteModel.findOne({ _id: req.params.id });

        if(waste){
            upload.single('imageFile')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).send({ message: "Multer error occurred." });
                } else if (err) {
                    return res.status(500).send({ message: "Unknown error occurred." });
                }
                let imageFileName = req.file ? req.file.filename : waste.imageFile || "";
              
                try {
                    let updatedWaste = await WasteModel.findByIdAndUpdate({_id:req.params.id},{
                        userName: req.body.userName,
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        type: req.body.type,
                        quantity: req.body.quantity,
                        description: req.body.description, 
                        locality: req.body.locality,
                        city: req.body.city,
                        status: req.body.status,
                        assignedTo: req.body.assignedTo,
                        assignedContact:req.body.assignedContact,
                        assignedEmail:req.body.assignedEmail,
                        assignedDate:req.body.assignedDate,
                        estimateDate:req.body.estimateDate,
                        completionDate:req.body.completionDate,
                        district: req.body.district,
                        imageFile: imageFileName
                    });

                    if(req.body.status){
                        sendMailForStatus(updatedWaste)
                    }

                    res.status(200).send({
                        message: "Waste query Edited successfully.",
                        updatedWaste
                    });
                } catch (createError) {
                    res.status(500).send({ message: createError.message || "Internal server error." });
                }
            });
        
        }else{
            res.status(404).send({
                message:"Opps...Only Registered User Can Create Waste Query"
            })
        }
        
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
    deleteWasteDetail,
    getWasteByReferenceLink
}