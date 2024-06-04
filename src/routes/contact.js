import express from 'express'
import ContactController from '../controller/contact.js'
const router = express.Router()
import AdminGaurd from '../middleware/AdminGaurd.js'
import StaffGaurd from '../middleware/StaffGaurd.js'

router.get('/',StaffGaurd,ContactController.getAllContacts)
router.get('/:id',StaffGaurd,ContactController.getContactById)
router.post('/',AdminGaurd,ContactController.createContact)
router.put('/:id',AdminGaurd,ContactController.editContact)
router.delete('/:id',AdminGaurd,ContactController.deleteContact)


export default router