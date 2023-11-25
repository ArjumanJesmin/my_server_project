import { Request, Response } from 'express'
import { UserServices } from '../services/user.Service'
import { UserValidationSchema } from '../zod/user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const zodParsedData = UserValidationSchema.parse(user)
    const result = UserServices.createUserIntoDB(zodParsedData)
    res.status(201).json({
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
  const userId = req.params.userId
  const userIdAsNumber = parseInt(userId)
  const userData = req.body

  try {
    const result = await UserServices.getSingleUser(userIdAsNumber, userData)
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
    const userData = req.body
    await UserServices.deleteUser(userIdAsNumber, userData)
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

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
