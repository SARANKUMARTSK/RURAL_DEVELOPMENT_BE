import express from 'express'
import ComplaintController from '../controller/complaint.js'
const router = express.Router()
import UserGuard from '../middleware/UserGaurd.js'
import StaffGaurd from '../middleware/StaffGaurd.js'
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',StaffGaurd,ComplaintController.getAllComplaints)
router.get('/:referenceLink',UserGuard,ComplaintController.getComplaintByReferenceLink)
router.get('/byId/:id',UserGuard,ComplaintController.getComplaintById)
router.post('/:id',UserGuard,ComplaintController.createComplaint)
router.put('/:id',UserGuard,ComplaintController.editComplaint)
router.delete('/:id',UserGuard,ComplaintController.deleteComplaint)


export default router
