import mongoose from "./index.js";


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const productSchema = new mongoose.Schema(
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
        userId :{
            type:String,
            required:[true,"User Id is Required"]
        },
        phoneNumber :{
            type:String , 
            required:[true , "Phone Number is Required"]
        },
        product:{
            type:String ,
            required:[true , "Product is Required"]
        },
        description:{
            type:String ,
            required:[true , "Description is Required"]
        },
        quantity : {
            type:String , 
            required :[true , "Quantity is Required"]
        },
        unit : {
            type:String , 
            required :[true , "Unit is Required"]
        },
        price:{
            type:String , 
            required :[true , "Price is Required"]
        },
        imageFile : {
            type:String, 
            required :[true , "Price is Required"]
        },
        locality:{
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
            type:String , 
            default : "Available"
        },
        createdAt : {
            type:Date , 
            default : new Date()
        }
    },
    {
        collection:"products", 
        versionKey:false
    }
)

const productModel = mongoose.model("products" , productSchema)

export default productModel