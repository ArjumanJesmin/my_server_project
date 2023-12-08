import { Model } from 'mongoose'
import { Order } from './order.interface'


export type Address = {
  street: string
  city: string
  country: string
}

export interface IUser {
  toObject: any
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  orders?: Order [] ;
}

export type IUserMethods = {
  isUserExists(userId: number): Promise<IUser | null>
}

export type UserModel = Model<IUser, {}, IUserMethods>

