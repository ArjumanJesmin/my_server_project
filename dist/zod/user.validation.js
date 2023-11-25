"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = exports.AddressValidationSchema = exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const AddressValidationSchema = zod_1.z
    .object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
})
    .strict();
exports.AddressValidationSchema = AddressValidationSchema;
const OrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
exports.OrderValidationSchema = OrderValidationSchema;
const UserValidationSchema = zod_1.z
    .object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string().min(1),
    }),
    age: zod_1.z.number().positive(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: AddressValidationSchema,
    orders: zod_1.z.array(OrderValidationSchema),
})
    .strict();
exports.UserValidationSchema = UserValidationSchema;
