import mongoose from "./index.js";


const announceMentSchema = new mongoose.Schema(
    {
        department:{
            type:String, 
            required:[true , "Department Name is Required"]
        },
        concernDistrict:{
            type:String , 
            default :"All"
        },
        schemeDetails:{
            title:{
                type:String , 
                required:[true ,"Title is Required"]
            },
            schemeNo:{
                type:String , 
                default:""
            },
            sponcer:{
                type:String , 
                default:""
            },
            pattern:{
                type:String , 
                default:""
            }
        },
        beneficiaries:{
            type:String , 
            default:""
        },
        type:{
            type:String , 
            default:""
        },
        eligibility:{
            income:{
                type:String , 
                default:""
            },
            age:{
                type:String , 
                default:""
            },
            community:{
                type:String , 
                default:""
            }
        },
        step:{
            type:String , 
            default:""
        },
        createdAt:{
             type:Date ,
             default:new Date()
        },
        description:{
            type:String , 
            default:""
        },
        endingDate :{
            type:Date 
        },
        imageFile:{
            type:String ,
            required:[true, "Image File Is Required"]
        }
    },
    {
        collection:"announcements", 
        versionKey:false
    }
)

const announcementModel = mongoose.model("announcements", announceMentSchema)

export default announcementModel