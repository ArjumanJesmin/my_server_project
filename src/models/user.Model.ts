import { Schema, model } from 'mongoose'
import {
  Address,
  IUser,
  IUserMethods,
  UserModel,
} from '../interface/user.Interface'

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true,  unique: true},
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: addressSchema,
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
})

userSchema.methods.isUserExists = async function (userId: number) {
  const existingOrders = await User.findOne({ userId })
  return existingOrders
}

export const User = model<IUser, UserModel>('User', userSchema)
