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
exports.UserServices = void 0;
const user_Model_1 = require("./../models/user.Model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = new user_Model_1.User(user);
    if (yield createUser.isUserExists(createUser.userId)) {
        throw new Error('User already exists!');
    }
    const userSelect = yield user_Model_1.User.create(user);
    const result = user_Model_1.User.findOne({ userId: userSelect.userId }).select({
        _id: 0,
        password: 0,
        orders: 0,
    });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_Model_1.User.find({}, {
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,
        _id: 0,
    });
    return result;
});
const getSingleUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_Model_1.User.findOne({ userId }).select({
        _id: 0,
        password: 0,
        orders: 0,
    });
    if (!user) {
        return null;
    }
    const result = user.toObject();
    const createUser = new user_Model_1.User(userData);
    if (yield createUser.isUserExists(createUser.userId)) {
        throw new Error('User already exists!');
    }
    return result;
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    const createUser = new user_Model_1.User(userData);
    if (yield createUser.isUserExists(createUser.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_Model_1.User.findOneAndUpdate(filter, userData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteUser = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    const createUser = new user_Model_1.User(user);
    if (yield createUser.isUserExists(createUser.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_Model_1.User.findOneAndDelete(filter);
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
