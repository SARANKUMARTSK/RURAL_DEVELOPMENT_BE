import express from 'express'
const router = express.Router()
import ProductController from '../controller/product.js'
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',ProductController.getAllProducts)
router.get('/:id',ProductController.getProductById)
router.get('/city',ProductController.getProductByCity)
router.post('/',UserGaurd,ProductController.createProduct)
router.put('/:id',UserGaurd,ProductController.editProduct)
router.delete('/:id',UserGaurd,ProductController.deleteProduct)

export default router