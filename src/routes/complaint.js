import express from 'express'
import ComplaintController from '../controller/complaint.js'
const router = express.Router()


router.get('/',ComplaintController.getAllComplaints)
router.get('/:id',ComplaintController.getComplaintByid)
router.post('/',ComplaintController.createComplaint)
router.put('/:id',ComplaintController.editComplaint)
router.delete('/:id',ComplaintController.deleteComplaint)


export default router
