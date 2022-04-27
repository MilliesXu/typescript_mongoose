import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'
import { iUserDocument } from './userModel'

const nanoId = customAlphabet('abcdefghijklmnopqrstuvwyz0123456789', 10)

export interface iProductDocument extends mongoose.Document {
  user: iUserDocument['_id']
  title: string,
  description: string,
  price: number,
  image: string,
  createdAt: Date,
  updatedAt: Date
}

const productSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${nanoId}`
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Product = mongoose.model<iProductDocument>('Product', productSchema)

export default Product
