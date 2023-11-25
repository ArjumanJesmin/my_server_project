import { Request, Response } from 'express'
import { OrderServices } from '../services/order.Service'


 const addOrdersToUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { productName, price, quantity } = req.body

  try {
    const result = await OrderServices.addOrderToUser(
      userId,
      productName,
      price,
      quantity
    )
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message,
      data: null,
    })
  }
}

// get orders
const getUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params
  const userIdAsNumber = parseInt(userId)
  try {
    const result = await OrderServices.getUserOrders(userIdAsNumber)

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
export const orderController = {
  addOrdersToUser,
  getUserOrders,
}
