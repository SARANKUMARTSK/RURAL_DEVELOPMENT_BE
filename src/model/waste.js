import mongoose from './index.js'

function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

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
        type:{
            type:String , 
            required:[true , "Waste Type is Required"]
        },
        quantity:{
            type : String , 
            required : [true , "Waste Qty is Required "]
        },
        description:{
            type : String , 
            required : [true , "Description is Required "]
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
        imageFile : {
            type:String ,
            default:""
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
        collection:"waste" , 
        versionKey :false
    }
)

const userModel = mongoose.model("waste",wasteSchema)

export default userModel