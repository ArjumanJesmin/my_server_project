import { Request, Response } from 'express'
import { UserServices } from '../services/user.Service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = UserServices.createUserIntoDB(user)
    res.status(200).json({
      status: 'success',
      message: 'user create successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

export const userControllers = {
  createUser,
}

