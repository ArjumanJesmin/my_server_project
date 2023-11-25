import { IUser } from '../interface/user.Interface'
import { User } from '../models/user.Model'


const addOrderToUser = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number
): Promise<IUser | null> => {
  try {

    const user = await User.findOne({ userId })

    if (!user) {
      throw new Error('User not found')
    }
    const newOrder = {
      productName,
      price,
      quantity,
    }
    if (!user.orders) {
      user.orders = []
    }
    user.orders.push(newOrder)
    const updatedUser = await user.save()

    return updatedUser
  } catch (error: any) {
    throw new Error(error.message)
  }
}


const getUserOrders = async (userId: number): Promise<IUser | null> => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 })
  return result
}

export const OrderServices = {
  getUserOrders,
  addOrderToUser,
}
