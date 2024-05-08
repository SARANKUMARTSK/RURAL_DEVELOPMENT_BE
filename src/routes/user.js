import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import UserController from '../controller/user.js'
const router = express.Router()

router.get('/',UserController.getAllUser)
router.get('/:id',UserController.getAllUser)
router.post('/',UserController.createUser)
router.post('/login',UserController.login)
router.delete('/:id',UserController.deleteUserById)
router.put('/:id', UserController.editUserById)
router.post('/forgotPassword',UserController.forgotMail)
router.post('/resetPassword/:token',UserController.resetPassword)

export default router