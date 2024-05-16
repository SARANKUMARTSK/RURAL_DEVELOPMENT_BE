import express from 'express'
const router = express.Router()
import GalleryController from '../controller/gallery.js'

router.get('/',GalleryController.getAllPhotos)
router.get('/:id',GalleryController.getPhotoById)
router.post('/',GalleryController.postImage)
router.delete('/:id',GalleryController.deleteImage)

export default router