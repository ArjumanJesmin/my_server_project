import { Schema } from "mongoose";
import { Order } from "../interface/order.interface";

export const orderSchema = new Schema<Order>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  })