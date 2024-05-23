import express from 'express'
const router = express.Router()
import AnnouncementController from '../controller/announcement.js'

router.get('/',AnnouncementController.getAllAnnouncemet)
router.get('/:id',AnnouncementController.getAnnouncementById)
router.post('/',AnnouncementController.createAnnouncement)
router.put('/:id',AnnouncementController.editAnnouncement)
router.delete('/:id',AnnouncementController.deleteAnnouncement)

export default router