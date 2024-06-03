import CustomerCareModel from "../model/customerCare.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const getAllQueries = async(req,res)=>{
    try {
        let query = await CustomerCareModel.find({})
         res.status(200).send({
            message:"Query Detail Fetched Successfully",
            query
         })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getQueryById = async(req,res)=>{
    try {
        let query = await CustomerCareModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:`${query.name}'s Query Fetched Successfully`,
            query
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createQuery = async(req,res)=>{
    try {
        let query = await CustomerCareModel.create(req.body)
        res.status(200).send({
            message:"Thank You For Contact Us... We Will Reach You Shortly",
            query
        })
        sendMail(query)
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editStatus = async (req, res) => {
    try {
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);

        const { status } = req.body;
        if (!status) {
            return res.status(400).send({
                message: "Status is required",
            });
        }

        const query = await CustomerCareModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } 
        );
        if (!query) {
            return res.status(404).send({
                message: "Query not found",
            });
        }

        console.log('Updated Query:', query);

        res.status(200).send({
            message: "Status Edited Successfully",
            query,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).send({
            message: error.message || "Internal Server Error",
        });
    }
};

const sendMail = async(query)=>{
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
        to: ['sarankumartsk@gmail.com',query.email?query.email:""],
        subject: "Cuetomer Care at Rural Development",
        html: `<div>
            <h1>Query Support Requested By ${query.email}</h1>
            <h2>Name: ${query.name}</h2>
            <h2>Contact : ${query.phoneNumber}</h2>
            <h2>City : ${query.city}</h2>
            <p>${query.district}</p>
            <p>${query.pincode}</p>
            <p>${query.title}</p>
            <p>${query.query}</p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully");
}

const deleteQuery = async(req,res)=>{
    try {
        let query = await CustomerCareModel.findByIdAndDelete({
            _id:req.params.id
        })
        res.status(200).send({
            message:`${query.name}'s Query Deleted Successfully`
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

export default {
    getAllQueries ,
    getQueryById ,
    createQuery , 
    deleteQuery,
    editStatus
}