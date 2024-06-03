import AnnouncementModel from '../model/announcement.js'
import multer from 'multer'

const getAllAnnouncemet = async(req,res)=>{
    try {
        let announcement = await AnnouncementModel.find({})
        res.status(200).send({
            message:"Announcement data fetched successfully",
            announcement
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getAnnouncementById = async(req,res)=>{
    try {
        let announcement = await AnnouncementModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"Announcement Data Fetched Successfully", 
            announcement
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
  const createAnnouncement = async (req, res) => {
    try {
      upload.single('imageFile')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).send({ message: "Multer Error Occurred" });
        } else if (err) {
          return res.status(500).send({ message: 'Unknown error occurred' });
        }
  
        const {
          department, concernDistrict, title, schemeNo, sponcer, pattern,
          beneficiaries, type, income, age, community, step, description, endingDate
        } = req.body;
        let imageFileName = req.file ? req.file.filename : complaint.imageFile || "";
  
        let data = {
          department,
          concernDistrict,
          schemeDetails: {
            title,
            schemeNo,
            sponcer,
            pattern,
          },
          beneficiaries,
          type,
          eligibility: {
            income,
            age,
            community,
          },
          step,
          description,
          endingDate,
          imageFile: imageFileName
        };
  
        let announcement = await AnnouncementModel.create(data);
  
        res.status(201).send({
          message: "Announcement Successfully Added",
          announcement
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Internal Server Error"
      });
    }
  };

const editAnnouncement = async(req,res)=>{
  try {
    let announcementData = await AnnouncementModel.findOne({_id:req.params.id})
    upload.single('imageFile')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ message: "Multer Error Occurred" });
      } else if (err) {
        return res.status(500).send({ message: 'Unknown error occurred' });
      }

      const {
        department, concernDistrict, title, schemeNo, sponcer, pattern,
        beneficiaries, type, income, age, community, step, description, endingDate
      } = req.body;
      let imageFileName = req.file ? req.file.filename : announcementData.imageFile || "";

      let data = {
        department,
        concernDistrict,
        schemeDetails: {
          title,
          schemeNo,
          sponcer,
          pattern,
        },
        beneficiaries,
        type,
        eligibility: {
          income,
          age,
          community,
        },
        step,
        description,
        endingDate,
        imageFile: imageFileName
      };

      let announcement = await AnnouncementModel.findByIdAndUpdate({_id:req.params.id},data);

      res.status(200).send({
        message: "Announcement Successfully Edited",
        announcement
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error"
    });
  }
}

const deleteAnnouncement = async(req,res)=>{
    try {
        let announcement =await AnnouncementModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Announcement Deleted Successfully", 
            announcement
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

export default {
    getAllAnnouncemet,
    getAnnouncementById,
    createAnnouncement,
    editAnnouncement,
    deleteAnnouncement
}