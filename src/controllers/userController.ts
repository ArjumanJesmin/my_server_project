import { Request, Response } from 'express'
import { UserServices } from '../services/user.Service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = UserServices.createUserIntoDB(user)
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
  const userIdAsNumber = parseInt(userId); 
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

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
}
