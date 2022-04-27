import mongoose from 'mongoose'
import { iUserDocument } from './userModel'

export interface iSessionDocument extends mongoose.Document {
  user: iUserDocument['_id']
  valid: boolean
  userAgent: string
  createdDate: Date
  updatedDate: Date
}

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  valid: { type: Boolean, default: true },
  userAgent: { type: String }
}, {
  timestamps: true
})

const Session = mongoose.model<iSessionDocument>('Session', sessionSchema)

export default Session
