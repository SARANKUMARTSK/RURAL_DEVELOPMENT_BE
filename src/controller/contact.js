import ContactModel from '../model/contact.js'



const getAllContacts = async(req,res)=>{
  try {
    let contact = await ContactModel.find({})
    res.status(200).send({
        message:"Contact Details Fetched Successfully",
        contact
    })
  } catch (error) {
    res.status(500).send({
        message:error.message||"Internal Server Error"
    })
  }

}

const createContact = async(req,res)=>{
    try {
        let contact = await ContactModel.create(req.body)
        res.status(201).send({
            message:"Contact Created Successfully",
            contact
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editContact = async(req,res)=>{
    try {
        let data = req.body
        let contact =await ContactModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        res.status(200).send({
            message:"Contact Edited Successfully",
            contact
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const deleteContact = async(req,res)=>{
    try {
        let contact = await ContactModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"Contact Deleted Successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}


export default {
    getAllContacts,
    createContact,
    editContact,
    deleteContact
}