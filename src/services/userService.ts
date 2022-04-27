import { DocumentDefinition } from 'mongoose'
import User, { iUserDocument } from '../models/userModel'

export const createUser = async (input: DocumentDefinition<Omit<iUserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>): Promise<iUserDocument> => {
  return await User.create(input)
}

export const validatePassword = async ({ email, password }: { email: string, password: string }): Promise<iUserDocument | null> => {
  const user = await User.findOne({ email })

  if (!user) return null

  const isValid = await user.comparePassword(password)

  if (!isValid) return null

  return user
}
