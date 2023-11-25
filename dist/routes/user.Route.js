"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post('/', userController_1.userControllers.createUser);
router.get('/', userController_1.userControllers.getAllUsers);
router.get('/:userId', userController_1.userControllers.getSingleUser);
router.put('/:userId', userController_1.userControllers.updateUser);
router.put('/:userId/orders', orderController_1.orderController.addOrdersToUser);
router.delete('/:userId', userController_1.userControllers.deleteUser);
router.get('/:userId/orders', orderController_1.orderController.getUserOrders);
router.get('/:userId/orders/total-price', orderController_1.calculateTotalPrice);
exports.userRoutes = router;
