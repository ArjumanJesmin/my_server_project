import { User } from './../models/user.Model'
import { IUser } from '../interface/user.Interface'
import { FilterQuery } from 'mongoose'

const createUserIntoDB = async (user: IUser) => {
  const createUser = new User(user)
  if (await createUser.isUserExists(createUser.userId)) {
    throw new Error('User already exists!')
  }
  const userSelect = await User.create(user)
  const result = User.findOne({ userId: userSelect.userId }).select({
    _id: 0,
    password: 0,
    orders: 0,
  })
  return result
}




const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find(
    {},
    {
      username: 1,
      'fullName.firstName': 1,
      'fullName.lastName': 1,
      age: 1,
      email: 1,
      'address.street': 1,
      'address.city': 1,
      'address.country': 1,
      _id: 0,
    }
  )
  return result
}

const getSingleUser = async (
  userId: number,
  userData: IUser
): Promise<IUser | null> => {
  const user = await User.findOne({ userId }).select({
    _id: 0,
    password: 0,
    orders: 0,
  })
  if (!user) {
    return null
  }
  const result: IUser = user.toObject()
  const createUser = new User(userData)
  if (await createUser.isUserExists(createUser.userId)) {
    throw new Error('User already exists!')
  }
  return result
}

const updateUser = async (
  userId: number,
  userData: IUser
): Promise<IUser | null> => {
  const filter: FilterQuery<IUser> = { userId }
  const createUser = new User(userData)
  if (await createUser.isUserExists(createUser.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.findOneAndUpdate(filter, userData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteUser = async (
  userId: number,
  user: IUser
): Promise<IUser | null> => {
  const filter: FilterQuery<IUser> = { userId }
  const createUser = new User(user)
  if (await createUser.isUserExists(createUser.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.findOneAndDelete(filter)
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
