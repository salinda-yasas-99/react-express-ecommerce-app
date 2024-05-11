import express from 'express'
import { checkProductId, createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/products.js'

const router = express.Router()

router.get('/',getAllProducts);
router.post('/',createProduct);
router.delete('/:id',deleteProduct)
router.get('/check-product-id',checkProductId)
router.put('/:id',updateProduct)


export default router