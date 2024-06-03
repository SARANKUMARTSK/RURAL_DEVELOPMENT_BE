import express from 'express'
import CustomerCareController from '../controller/customerCare.js'
const router = express.Router()

router.get('/',CustomerCareController.getAllQueries)
router.get('/:id',CustomerCareController.getQueryById)
router.post('/',CustomerCareController.createQuery)
router.put('/:id',CustomerCareController.editStatus)
router.delete('/:id',CustomerCareController.deleteQuery)


export default router