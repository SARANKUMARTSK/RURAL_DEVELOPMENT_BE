import express from 'express'
import mongoose from './index.js'

const wasteSchema = new mongoose.Schema(
    {
        userName : {
            type:String , 
            required : [true, "User Name is Required"]
        },
        email : {
            type:String , 
            required : [true , "Email is Required"]
        },
        phoneNumber : {
            type : String , 
            required : [true , "Phone Number is Required"]
        },
        wasteDetails:{
            type:{
                type:String , 
                required:[true , "Waste Type is Required"]
            },
            quantity:{
                type : String , 
                required : [true , "Waste Qty is Required "]
            },
            locality:{
                type:String ,
                required : [true , "Locality is Required"]
            },
            city : {
                type:String , 
                required:[true , "City is Required"]
            },
            district : {
                type:String , 
                required :[true , "District is Required"]
            },
            imageUrl : {
                type:String ,
                required :[true , "Image Url is Required"]
            }
        },
        createdAt : {
            type:Date , 
            default : new Date()
        },
        status:{
            type:String , 
            default : "Registered"
        },
        assignedTo : {
            type:String , 
            default : "Not-Assigned"
        }
    },
    {
        collection:"waste" , 
        versionKey :false
    }
)

const userModel = mongoose.model("waste",wasteSchema)

export default userModel