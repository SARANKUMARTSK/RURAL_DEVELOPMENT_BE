import express from 'express'
const router = express.Router()
import AnnouncementController from '../controller/announcement.js'
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',AnnouncementController.getAllAnnouncemet)
router.get('/:id',AnnouncementController.getAnnouncementById)
router.post('/',AdminGaurd,AnnouncementController.createAnnouncement)
router.put('/:id',AdminGaurd,AnnouncementController.editAnnouncement)
router.delete('/:id',AdminGaurd,AnnouncementController.deleteAnnouncement)

export default router