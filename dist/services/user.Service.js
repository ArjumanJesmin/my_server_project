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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_Model_1 = require("./../models/user.Model");
const bcrypt = require('bcrypt');
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = user, otherUserData = __rest(user, ["password"]);
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = new user_Model_1.User(Object.assign(Object.assign({}, otherUserData), { password: hashedPassword }));
        const savedUser = yield newUser.save();
        return savedUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
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
