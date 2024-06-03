import mongoose from "./index.js";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const customerCareSchema = new mongoose.Schema(
    {
        name:{
            type:String , 
            required:[true , "Name is Required"]
        },
        email:{
            type:String , 
            required:[true,"Email is Required"],
            validate: {
                validator: (value) => validateEmail(value)
            }
        },
        phoneNumber :{
            type:String , 
            required:[true , "Phone Number is Required"]
        },
        city:{
            type:String , 
            default:""
        },
        district:{
            type:String , 
            default:""
        },
        pincode:{
            type:String , 
            default:""
        },
        status:{
            type:String , 
            default:"New"
        },
        createdAt:{
            type:Date , 
            default:new Date()
        },
        title:{
            type:String , 
            default:""
        },
        query:{
            type:String , 
            default:""
        }

    },
    {
        collection:"customerCare" , 
        versionKey : false
    }
)

const customerCareModel = mongoose.model("customerCare", customerCareSchema)

export default customerCareModel