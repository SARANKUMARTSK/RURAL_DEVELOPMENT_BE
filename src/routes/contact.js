import express from 'express'
import ContactController from '../controller/contact.js'
const router = express.Router()
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',ContactController.getAllContacts)
router.get('/:id',ContactController.getContactById)
router.post('/',AdminGaurd,ContactController.createContact)
router.put('/:id',AdminGaurd,ContactController.editContact)
router.delete('/:id',AdminGaurd,ContactController.deleteContact)


export default router