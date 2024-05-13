import mongoose from "./index.js";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const contactSchema = new mongoose.Schema(
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
        fax:{
            type:String , 
            required:[true , "Fax Number is Required"]
        },
        position:{
            type:String , 
            required:[true , "Position is Required"]
        },
        locality:{
            type:String , 
            default:""
        },
        city:{
            type:String , 
            default:""
        },
        district:{
            type:String , 
            required:[true , "District is Required"]
        },
        state:{
            type:String , 
            required:[true , "State is Required"]
        }

    },
    {
        collection:"contacts" , 
        versionKey : false
    }
)

const contactsModel = mongoose.model("contacts", contactSchema)

export default contactsModel