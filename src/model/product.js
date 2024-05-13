import mongoose from "./index.js";


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
        price:{
            type:String , 
            required :[true , "Price is Required"]
        },
        productImage : {
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
            type:Boolean , 
            default : true
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