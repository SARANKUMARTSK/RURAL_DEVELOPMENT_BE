import GalleryModel from '../model/gallery.js'
import multer from 'multer'

const getAllPhotos = async(req,res)=>{
    try {
        const photos = await GalleryModel.find({})
        res.status(200).send({
            message:"Photos Fetched Successfully",
            photos
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getPhotoById = async(req,res)=>{
    try {
        let photo = await GalleryModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Photo Fetched Successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/images');
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });

const upload = multer({ storage: storage });

const postImage = async(req,res)=>{
    try {
        
            upload.single('imageFile')(req,res,async function(err){
                if(err instanceof multer.MulterError){
                    return res.status(500).send({message:"Multer Error Occured"})
                }else if(err){
                    return res.status(500).send({ message: 'Unknown error occurred' });
                }
            
           
            let uploadImage = await GalleryModel.create({
                event:req.body.event, 
                imageFile :req.file.filename
            });
            res.status(201).send({
                message: "Image Added to gallery Successfully",
                uploadImage
            });})
            
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}

const deleteImage = async(req,res)=>{
    try {
        let image = await GalleryModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Image Successfully Deleted From Gallery"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


export default {
    getAllPhotos,getPhotoById,postImage,deleteImage
}