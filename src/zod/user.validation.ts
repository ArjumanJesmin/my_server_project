import { z } from 'zod'

const AddressValidationSchema = z
  .object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  })
  .strict()

const OrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
})

const UserValidationSchema = z
  .object({
    userId: z.number().int(),
    username: z.string().min(1),
    password: z.string().min(1),
    fullName: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
    }),
    age: z.number().positive(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AddressValidationSchema,
    orders: z.array(OrderValidationSchema).optional(),
  })
  .strict()

export {
  UserValidationSchema ,
  AddressValidationSchema ,
  OrderValidationSchema ,
}
