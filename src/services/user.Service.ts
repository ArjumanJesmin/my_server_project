import { IUser } from '../interface/user.Interface'
import { User } from '../models/user.Model'

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user)
  return result
}

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}
const getSingleUser = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
}
