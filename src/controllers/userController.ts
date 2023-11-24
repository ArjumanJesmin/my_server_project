import { Request, Response } from 'express'
import { UserServices } from '../services/user.Service'
import { UserValidationSchema } from '../zod/user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const zodParsedData = UserValidationSchema.parse(user)
    const result = UserServices.createUserIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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

//update order
const addOrdersToUser = async (req: Request, res: Response) => {
  try {
    const { userDetails, productName, price, quantity } = req.body

    const user = {
      ...userDetails,
      orders: [
        {
          productName,
          price,
          quantity,
        },
      ],
    }
    const result = await UserServices.addOrderToUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers()
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const userIdAsNumber = parseInt(userId)
  try {
    const result = await UserServices.getSingleUser(userIdAsNumber)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const userIdAsNumber = parseInt(userId)
    const userData = req.body
    const result = await UserServices.updateUser(userIdAsNumber, userData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const userIdAsNumber = parseInt(userId)

    await UserServices.deleteUser(userIdAsNumber)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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

// get orders
const getUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params
  const userIdAsNumber = parseInt(userId)
  try {
    const result = await UserServices.getUserOrders(userIdAsNumber)

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

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserOrders,
  addOrdersToUser,
}
