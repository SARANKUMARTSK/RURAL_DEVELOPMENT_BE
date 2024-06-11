import express from 'express'
import ConversationModel from '../model/conversation.js'
const router = express.Router()

router.post('/',async(req,res)=>{
    const newConversation = new ConversationModel({
       members:[req.body.senderId , req.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).send({
            message:"Conversation Saved",
            savedConversation
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
})

router.get('/:userId',async(req,res)=>{
    try {
        const conversation = await ConversationModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).send({
            message:"Conversation Fetched Successfully",
            conversation
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
})



export default router