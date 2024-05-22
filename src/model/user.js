import mongoose from "./index.js";
// Roles ------------
// user 
// staff 
// admin 
// superAdmin

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String ,
            required:[true,"Name is Required"]
        },
        email:{
            type:String , 
            required:[true,"Email is Required"],
            validate: {
                validator: (value) => validateEmail(value)
            }
        },
        phoneNumber:{
            type:String , 
            required:[true ,"Phone Number is Required"]
        },
        address:{
            doorNo:{
                type:String , 
                default:""
            },
            street:{
                type:String , 
                required:[true,"Street Name is Required"]
            },
            locality:{
                type: String,
                required: [true, "Village is required"]
            },
            city: {
                type: String,
                required: [true, "City is required"]
            },
            district:{
                type:String,
                required:[true,"District is required"]
            },
            state:{
                type:String , 
                required:[true,"State is required"]
            },
            pincode: {
                type: Number,
                required: [true, "Pincode is required"]
            }
        },
        gender:{
            type:String,
            default:""
        },
        password:{
            type:String , 
            required:[true,"Password is Required"]
        },
        role:{
            type:String ,
            default:"user"
        },
        subRole :{
            type:String ,
            default:""
        },
        createdAt:{
            type:Date , 
            default:new Date()
        },
        complaints:{
            type:Array , 
            default :[]
        },
        donations:{
            type:Array , 
            default :[]
        },
        products:{
            type:Array , 
            default : []
        },
        status:{
            type:String , 
            default:"Active"
        }
    },
    {
        collection:"users",
        versionKey:false
    }
)

const userModel = mongoose.model("users",userSchema)

export default userModel