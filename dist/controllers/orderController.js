"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.calculateTotalPrice = void 0;
const order_Service_1 = require("../services/order.Service");
const addOrdersToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;
    try {
        const result = yield order_Service_1.OrderServices.addOrderToUser(userId, productName, price, quantity);
        res.json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
// get orders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userIdAsNumber = parseInt(userId);
    try {
        const result = yield order_Service_1.OrderServices.getUserOrders(userIdAsNumber);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userIdAsNumber = parseInt(userId);
    try {
        const totalPrice = yield order_Service_1.OrderServices.calculateTotalPrice(userIdAsNumber);
        if (totalPrice === null) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        return res.json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error calculating total price',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
exports.calculateTotalPrice = calculateTotalPrice;
exports.orderController = {
    addOrdersToUser,
    getUserOrders,
};
