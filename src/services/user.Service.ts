import { IUser } from '../interface/user.Interface'
import { User } from '../models/user.Model'
import { FilterQuery } from 'mongoose'

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

const updateUser = async (
  userId: number,
  userData: IUser
): Promise<IUser | null> => {
  const filter: FilterQuery<IUser> = { userId }

  const result = await User.findOneAndUpdate(filter, userData, {
    new: true,
    runValidators: true,
  })

  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
}
