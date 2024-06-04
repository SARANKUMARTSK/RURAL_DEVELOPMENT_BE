import express from 'express'
import CustomerCareController from '../controller/customerCare.js'
const router = express.Router()
import StaffGaurd from '../middleware/StaffGaurd.js'
import UserGaurd from '../middleware/UserGaurd.js'
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',StaffGaurd,CustomerCareController.getAllQueries)
router.get('/:id',StaffGaurd,CustomerCareController.getQueryById)
router.post('/',CustomerCareController.createQuery)
router.put('/:id',StaffGaurd,CustomerCareController.editStatus)
router.delete('/:id',AdminGaurd,CustomerCareController.deleteQuery)


export default router