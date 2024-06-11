import mongoose from "./index.js";


const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:String, 
        },
        sender:{
            type:String,
        },
        text:{
            type:String,
        }

    },
    {
        collection:"message" , 
        versionKey : false,
        timestamps:true
    }
)

const messageModel = mongoose.model("message", messageSchema)

export default messageModel