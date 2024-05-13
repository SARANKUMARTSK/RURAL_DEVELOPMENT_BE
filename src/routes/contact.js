import express from 'express'
import ContactController from '../controller/contact.js'
const router = express.Router()

router.get('/',ContactController.getAllContacts)
router.post('/',ContactController.createContact)
router.put('/:id',ContactController.editContact)
router.delete('/:id',ContactController.deleteContact)


export default router