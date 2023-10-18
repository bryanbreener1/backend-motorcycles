import { Router } from "express";
import {
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser
} from './users.controller.js'
import { login, register, changePassword } from "./auth/auth.controller.js";
import { protect } from "./auth/auth.middleware.js";
import { userExist } from "./users.middleware.js";

export const router = Router()

router.get('/',protect , findAllUsers)  
router.post('/', register)
router.post('/login', login)

router
    .route('/:id')
    .get(userExist,findOneUser)
    .patch(userExist,updateUser)
    .delete(userExist,deleteUser)