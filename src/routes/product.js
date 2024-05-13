import express from 'express'
const router = express.Router()
import ProductController from '../controller/product.js'

router.get('/',ProductController.getAllProducts)
router.get('/:id',ProductController.getProductById)
router.post('/',ProductController.createProduct)
router.put('/:id',ProductController.editProduct)
router.delete('/:id',ProductController.deleteProduct)

export default router