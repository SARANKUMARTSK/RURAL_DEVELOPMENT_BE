import mongoose from "./index.js";


const conversationSchema = new mongoose.Schema(
    {
        members:{
            type:Array, 
        }

    },
    {
        collection:"conversation" , 
        versionKey : false,
        timestamps:true
    }
)

const conversationModel = mongoose.model("conversation", conversationSchema)

export default conversationModel