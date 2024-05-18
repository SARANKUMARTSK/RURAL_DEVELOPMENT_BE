import mongoose from "./index.js";

function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

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
        locality : {
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
        state :{
            type:String , 
            required : [true , "State is Required"]
        },
        pincode:{
            type:String , 
            default:""
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
        imageFile:{
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
        referenceLink :{
            type:String , 
            default : generateRandomString(25)
        }
       
    },
    {
        collection : "complaints",
        versionKey : false
    }
)

const complaintModel = mongoose.model("complaints",complaintSchema)

export default complaintModel