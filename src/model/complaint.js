import mongoose from "./index.js";


const complaintSchema = new mongoose.Schema(
    {
        userName : {
            type:String , 
            required : [true , "User Name is Required"]
        },
        userEmail : {
            type:String , 
            required : [true , "User Email is Required"]
        },
        userPhoneNumber : {
            type : String , 
            required : [true , "User Phone Number is Required"]
        },
        userId : {
            type : String , 
            required : [true , "UserId is Required"]
        },
        panjayath : {
            type : String , 
            required :[true , "Panjayath Name is Required"]
        },
        city : {
            type:String , 
            required : [true , "City is Required"]
        },
        district :{
            type:String , 
            required : [true , "District is Required"]
        },
        department :{
            type :String , 
            required : [true , "Department is Required"]
        },
        title : {
            type:String , 
            required : [true , "Title is Required"]
        },
        description:{
            type:String , 
            required : [true , "Description is Required"]
        },
        complaintImage:{
            type : String , 
            required :[true , "Post Your Complaint Photo"]
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
        },
       
    },
    {
        collection : "complaints",
        versionKey : false
    }
)

const complaintModel = mongoose.model("complaints",complaintSchema)

export default complaintModel