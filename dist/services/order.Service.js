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
exports.OrderServices = void 0;
const user_Model_1 = require("../models/user.Model");
const addOrderToUser = (userId, productName, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_Model_1.User.findOne({ userId });
        if (!user) {
            throw new Error('User not found');
        }
        const newOrder = {
            productName,
            price,
            quantity,
        };
        if (!user.orders) {
            user.orders = [];
        }
        user.orders.push(newOrder);
        const updatedUser = yield user.save();
        return updatedUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_Model_1.User.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
});
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aggregateResult = yield user_Model_1.User.aggregate([
            {
                $match: { userId: Number(userId) },
            },
            { $unwind: '$orders', },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                    },
                },
            },
        ]);
        if (aggregateResult.length === 0) {
            return null;
        }
        return aggregateResult[0].totalPrice;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.OrderServices = {
    getUserOrders,
    addOrderToUser,
    calculateTotalPrice
};
