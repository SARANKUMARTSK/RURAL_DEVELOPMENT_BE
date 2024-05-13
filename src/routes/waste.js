import express from 'express'
const router = express.Router()
import WasteController from '../controller/waste.js'

router.get('/',WasteController.getAllWaste)
router.get('/:id',WasteController.getWasteById)
router.post('/',WasteController.createWaste)
router.put('/:id',WasteController.editWasteDetail)
router.delete('/:id',WasteController.deleteWasteDetail)

export default router

