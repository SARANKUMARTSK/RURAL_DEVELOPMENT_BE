import UserModel from "../model/user.js";
import Auth from '../utils/auth.js'
import nodemailer from 'nodemailer'
const getAllUser = async(req,res)=>{
    try {
        let user = await UserModel.find({},{password:0})
        res.status(200).send({
            message:"User Data Fetched Successfully", 
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createUser = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            let data = req.body;
            let newUser = await UserModel.create(data);
            res.status(201).send({
                message:"User Created Successfull",
                newUser
            })
        }else{
            res.status(400).send({
                message:`User with ${req.body.email} is already exists`
            })
        }
        
       
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getUserById = async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.params.id})
        if(user){
            res.status(200).send({
                message:"User data fetched successfull",
                user
            })
        }else{
            res.status(404).send({
                message:"User Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteUserById = async(req,res)=>{
    try {
        let user = await UserModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"User Deleted Successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}
const login = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
       if(user.status=="Active"){
        if(user){
            if(await Auth.hashCompare(req.body.password,user.password)){
                let token = await Auth.createToken({
                    name:user.name , 
                    email:user.email ,
                    id:user._id, 
                    role:user.role
                })
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    name:user.name , 
                    email:user.email ,
                    id:user._id, 
                    role:user.role
                })
            }else{
                res.status(400).send({
                    message:" Incorrect Password"
                })
            }
        }else{
            res.status(404).send({
                message: `User with ${req.body.email} does not exist`
            })
        }
       }else{
        res.status(404).send({
            message:"You are Blocked By Admin. Contact Admin For Other Details"
        })
       }
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const forgotMail = async (req, res) => {
    try {
        let user = await UserModel.findOne({email:req.body.email})
        let token = await Auth.createToken({
                name:user.name,
                email:user.email,
                id:user._id,
                role:user.role
        })
        if(user){
            const transporter = nodemailer.createTransport({
                service:"gmail",
                host:"smtp.gmail.email",
                port:587,
                secure:false,
                auth:{
                    user:process.env.USER_MAIL,
                    pass:process.env.MAIL_PASS
                }
            })
    
            const mailOption = {
                from:{
                    name:'RURAL_DEVELOPMENT',
                    address:process.env.USER_MAIL
                },
                to:[req.body.email],
                subject:"Reset password link for RURAL_DEVELOPMENT Application",
                
                html : `<div>
                <h6>Hello User , Please click the below link to reset your password </h6>
                <a>effervescent-banoffee-bf65cb.netlify.app/reset-password/${token}</a>
                </div>`
            }
    
            const sendMail = async(transporter,mailOption)=>{
                try {
                    await transporter.sendMail(mailOption);
                    res.status(201).send({
                        message:"Mail send Successfully"
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            sendMail(transporter,mailOption)
        }else{
            res.status(404).send({
                message:`User With ${req.body.email} does not exist`
            })
        }
        
        
    } catch (error) {
        res.status(500).send({
             message: 'Failed to send password reset email.' 
        })
    }
};

const editUserById = async(req,res)=>{
    try {
        let data = {
            name:req.body.name,
            email:req.body.email , 
            phoneNumber : req.body.phoneNumber,
            status:req.body.status,
            "address.doorNo":req.body.doorNo,
            "address.street":req.body.street , 
            "address.locality" : req.body.locality , 
            "address.city" : req.body.city , 
            "address.district":req.body.city , 
            "address.state":req.body.state , 
            "address.pincode" : req.body.pincode
        }
        let user = await UserModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        res.status(200).send({
            message:"User Edited Successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const resetPassword = async(req,res)=>{
    try {
        let token = req.params.token
        const decodedToken = await Auth.decodeToken(token)
        if(!decodedToken){
            res.status(401).send({
                message:"Invalid Token"
            })
        }
        const user = await UserModel.findOne({_id:decodedToken.id})
        if(!user){
            res.status(401).send({
                message:"User Not Found"
            })
        }
        req.body.password = await Auth.hashPassword(req.body.password)
        user.password = req.body.password
        await user.save()

        res.status(200).send({
            message:"Password Updated"
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


export default {
    getAllUser,
    createUser,
    deleteUserById,
    getUserById,
    login,
    editUserById,
    resetPassword,
    forgotMail
}