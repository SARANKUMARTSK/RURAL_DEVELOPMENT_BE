import mongoose from './index.js'


const wasteSalesSchema = new mongoose.Schema(
    {
        name : {
            type:String , 
            required : [true, "Name is Required"]
        },
        email : {
            type:String , 
            required : [true , "Email is Required"]
        },
        phoneNumber : {
            type : String , 
            required : [true , "Phone Number is Required"]
        },
        title :{
            type:String , 
            required:[true,"Title is Required"]
        },
        description:{
            type:String , 
            required:[true,"Description is Required"]
        },
        district:{
            type:String , 
            required:[true,"District is Required"]
        },
        city:{
            type:String , 
            required:[true,"City is Required"]
        },
        quantity:{
            type:String,
            default:""
        },
        createdAt :{
            type:Date , 
            default : new Date()
        }, 
        price:{
            type:String,
            required:[true,'Price is Required']
        },
        imageFile:{
            type:String ,
            default:""
        }
    },
    {
        collection:"wasteSales",
        versionKey:false
    }
)

const wasteSalesModel = mongoose.model('wasteSales',wasteSalesSchema)
export default wasteSalesModel