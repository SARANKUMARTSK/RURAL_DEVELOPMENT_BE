import express from 'express'
const router = express.Router()
import WasteSalesController from '../controller/wasteSales.js'

router.get('/',WasteSalesController.getAllWasteSales)
router.get('/:id',WasteSalesController.getWasteSalesById)
router.post('/',WasteSalesController.createSalesWaste)
router.put('/:id',WasteSalesController.editSalesWaste)
router.delete('/:id',WasteSalesController.deleteWasteSales)


export default router