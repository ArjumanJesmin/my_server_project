import { User } from './../models/user.Model'
import { IUser } from '../interface/user.Interface'
import { FilterQuery } from 'mongoose'

const createUserIntoDB = async (user: IUser) => {
  const createUser = new User(user)
  if (await createUser.isUserExists(createUser.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(user)
  return result
}

const addOrderToUser = async (user: IUser) => {
  const result = await User.findOneAndUpdate(user)
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

const deleteUser = async (userId: number): Promise<IUser | null> => {
  const filter: FilterQuery<IUser> = { userId }

  const result = await User.findOneAndDelete(filter)

  return result
}

const getUserOrders = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserOrders,
  addOrderToUser,
}
