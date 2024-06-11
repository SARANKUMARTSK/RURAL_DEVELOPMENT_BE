import express from 'express'
import MessageModel from '../model/message.js'
const router = express.Router()

router.post('/',async(req,res)=>{
    let newMessage = new MessageModel(req.body) 
    try {
        const savedMessage = await newMessage.save()
        res.status(200).send({
            message:"New Message Saved",
            savedMessage
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
})

router.get('/:conversationId',async(req,res)=>{
    try {
        const messages = await MessageModel.find({
            conversationId:req.params.conversationId
        })
        res.status(200).send({
            messages:"Messages Fetched ",
            messages
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
})

export default router