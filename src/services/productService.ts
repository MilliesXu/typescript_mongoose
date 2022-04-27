import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

import Product, { iProductDocument } from '../models/productModel'

export const createProduct = async (input: DocumentDefinition<Omit<iProductDocument, 'createdAt' | 'updatedAt'>>) => {
  return await Product.create(input)
}

export const findProduct = async (query: FilterQuery<iProductDocument>, options: QueryOptions = { lean: true }) => {
  return await Product.findOne(query, {}, options)
}

export const findAndUpdateProduct = async (query: UpdateQuery<iProductDocument>, update: DocumentDefinition<Omit<iProductDocument, 'createdAt' | 'updatedAt'>>, options: QueryOptions) => {
  return await Product.findOneAndUpdate(query, update, options)
}

export const deleteProduct = async (query: FilterQuery<iProductDocument>) => {
  return await Product.findOneAndDelete(query)
}
