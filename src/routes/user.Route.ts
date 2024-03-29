import express from 'express'
import { userControllers } from '../controllers/userController'
import { calculateTotalPrice, orderController } from '../controllers/orderController'
const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)
router.put('/:userId/orders', orderController.addOrdersToUser);
router.delete('/:userId', userControllers.deleteUser)
router.get('/:userId/orders', orderController.getUserOrders)
router.get('/:userId/orders/total-price', calculateTotalPrice);

export const userRoutes = router
