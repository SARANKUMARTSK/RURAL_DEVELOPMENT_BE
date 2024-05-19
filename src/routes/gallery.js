import express from 'express'
const router = express.Router()
import GalleryController from '../controller/gallery.js'
import AdminGaurd from '../middleware/AdminGaurd.js'

router.get('/',GalleryController.getAllPhotos)
router.get('/:id',GalleryController.getPhotoById)
router.post('/',AdminGaurd,GalleryController.postImage)
router.delete('/:id',AdminGaurd,GalleryController.deleteImage)

export default router