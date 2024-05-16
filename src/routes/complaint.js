import express from 'express'
import ComplaintController from '../controller/complaint.js'
const router = express.Router()


router.get('/',ComplaintController.getAllComplaints)
router.get('/:referenceLink',ComplaintController.getComplaintByReferenceLink)
router.get('/byId/:id',ComplaintController.getComplaintById)
router.post('/:id',ComplaintController.createComplaint)
router.put('/:id',ComplaintController.editComplaint)
router.delete('/:id',ComplaintController.deleteComplaint)


export default router
