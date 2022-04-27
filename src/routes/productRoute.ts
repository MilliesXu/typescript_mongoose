import express from 'express'
import validate from '../middlewares/validateRequest'
import deserializeUser from '../middlewares/deserializeUser'
import { createProductHandler, getProductHandler, updateProductHandler, deleteProductHandler } from '../controllers/productController'
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schemas/productSchema'

const productRoute = express.Router()

productRoute.post('/', deserializeUser, validate(createProductSchema), createProductHandler)
productRoute.get('/:productId', deserializeUser, validate(getProductSchema), getProductHandler)
productRoute.put('/:productId', deserializeUser, validate(updateProductSchema), updateProductHandler)
productRoute.delete('/:productId', deserializeUser, validate(deleteProductSchema), deleteProductHandler)

export default productRoute
