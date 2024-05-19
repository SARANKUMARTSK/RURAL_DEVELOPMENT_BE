import express from 'express'
const router = express.Router()
import WasteController from '../controller/waste.js'
import UserGaurd from '../middleware/UserGaurd.js'
import StaffGaurd from '../middleware/StaffGaurd.js'

router.get('/',StaffGaurd,WasteController.getAllWaste)
router.get('/:id',UserGaurd,WasteController.getWasteById)
router.get('/track/:referenceLink',UserGaurd,WasteController.getWasteByReferenceLink)
router.post('/:userId',UserGaurd,WasteController.createWaste)
router.put('/:id',UserGaurd,WasteController.editWasteDetail)
router.delete('/:id',UserGaurd,WasteController.deleteWasteDetail)

export default router

