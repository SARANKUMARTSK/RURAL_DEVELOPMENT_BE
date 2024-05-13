import mongoose from "./index.js";


const announceMentSchema = new mongoose.Schema(
    {
        from:{
            type:String , 
            required : [true , "From Address is Required"]
        }, 
        to:{
            type:String , 
            rquired : [true , "To Address is Required"]
        }, 
        topic:{
            type:String , 
            required:[true , "Topic is Required"]
        },
        createdAt : {
            type:Date , 
            default :new Date()
        },
        endingDate:{
            type:Date , 
            required :[true , "Ending Date id Required"]
        },
        description:{
            type:String , 
            required : [true , "Description is Required "]
        }
    },
    {
        collection:"announcements", 
        versionKey:false
    }
)

const announcementModel = mongoose.model("announcements", announceMentSchema)

export default announcementModel