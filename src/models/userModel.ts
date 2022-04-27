import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Type for userModel
export interface iUserDocument extends mongoose.Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

// use mongoose hook to hash password before model save
userSchema.pre('save', async function (next) {
  const user = this as iUserDocument

  if (!user.isModified('password')) {
    return next()
  } else {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR as string))

    const hashedPassword = await bcrypt.hashSync(user.password, salt)

    user.password = hashedPassword

    return next()
  }
})

// Add method in schema directly so can call this method via schema
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<Boolean> {
  const user = this as iUserDocument

  try {
    return bcrypt.compare(candidatePassword, user.password)
  } catch (error: any) {
    return false
  }
}

const User = mongoose.model<iUserDocument>('User', userSchema)

export default User
