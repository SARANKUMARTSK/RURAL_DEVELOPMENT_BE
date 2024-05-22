import express from 'express'
import UserController from '../controller/user.js'
const router = express.Router()
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',AdminGaurd,UserController.getAllUser)
router.get('/:id',AdminGaurd,UserController.getUserById)
router.post('/',UserController.createUser)
router.post('/login',UserController.login)
router.delete('/:id',AdminGaurd,UserController.deleteUserById)
router.put('/:id', UserController.editUserById)
router.post('/forgotPassword',UserController.forgotMail)
router.post('/resetPassword/:token',UserController.resetPassword)

export default router