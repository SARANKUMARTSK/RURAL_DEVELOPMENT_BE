import mongoose from './index.js'

const gallerySchema = new mongoose.Schema(
    {
        event:{
            type:String , 
            required:[true,"Event Name is Required"]
        },
        imageFile:{
            type:String , 
            required:[true ,"Image File is Required"]
        }
    },
    {
        collection:"gallery",
        versionKey:false
    }
)

const galleryModel = mongoose.model('gallery',gallerySchema)
export default galleryModel