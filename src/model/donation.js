import mongoose from "./index.js";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const donationSchema = mongoose.Schema(
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
        particular:{
            type:String ,
            required:[true , "Particular is Required"]
        },
        description:{
            type:String ,
            required:[true , "Description is Required"]
        },
        quantity : {
            type:String , 
            default :"Not-Mentioned"
        },
        panjayath:{
            type:String , 
            required:[true , "Panjayath is Required"]
        },
        city:{
            type:String , 
            required:[true , "City is Required"]
        },
        district:{
            type:String , 
            required:[true , "District is Required"]
        },
        state:{
            type:String , 
            required:[true , "State is Required"]
        },
        status:{
            type:Boolean , 
            default : true
        },
        createdAt : {
            type:Date , 
            default : new Date()
        }
    },
    {
        collection : "donations",
        versionKey : false
    }
)

const donationModel = mongoose.model("donations" , donationSchema)

export default donationModel