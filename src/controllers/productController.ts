import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CreateProductInput, ReadProductInput, UpdateProductInput, DeleteProductInput } from '../schemas/productSchema'
import { createProduct, findProduct, findAndUpdateProduct, deleteProduct } from '../services/productService'

export const createProductHandler = asyncHandler(async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
  const userId = res.locals.user.userId
  const body = req.body

  const product = await createProduct({ ...body, user: userId })

  if (!product) {
    res.status(500)
    throw new Error('Failed to create the product')
  }

  res.send(product)
})

export const getProductHandler = asyncHandler(async (req: Request<ReadProductInput['params']>, res: Response) => {
  const productId = req.params.productId

  const product = await findProduct({ productId })

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.send(product)
})

export const updateProductHandler = asyncHandler(async (req: Request<UpdateProductInput['params']>, res: Response) => {
  const userId = res.locals.user.userId
  const productId = req.params.productId
  const body = req.body

  const product = await findProduct({ productId })

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  if (product.user.toString() !== userId) {
    res.status(403)
    throw new Error('You are not allowed to modified this')
  }

  const updateProduct = await findAndUpdateProduct({ productId }, body, { new: true })

  if (!updateProduct) {
    res.status(500)
    throw new Error('Failed to update the product')
  }

  res.send(updateProduct)
})

export const deleteProductHandler = asyncHandler(async (req: Request<DeleteProductInput['params']>, res: Response) => {
  const userId = res.locals.user.userId
  const productId = req.params.productId

  const product = await findProduct({ productId })

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  if (product.user.toString() !== userId) {
    res.status(403)
    throw new Error('You are not allowed to modified this')
  }

  const deletedProduct = await deleteProduct({ productId })

  if (!deletedProduct) {
    res.status(500)
    throw new Error('Failed to delete the product')
  }

  res.send(deletedProduct)
})
