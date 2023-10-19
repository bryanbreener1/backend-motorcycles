import { Router } from "express";
import {
    findAllRepairs,
    createRepair,
    findOneRepair,
    updateRepair,
    deleteRepair
} from './repairs.controller.js'
import { statusPendingExist } from "./repairs.middleware.js";
import { protect, restrictTo } from "../users/auth/auth.middleware.js";

export const router = Router()

router
    .route('/')
    .get(protect, restrictTo('employee'),findAllRepairs)
    .post(protect, restrictTo('employee'),createRepair)

router
    .route('/:id')
    .get(statusPendingExist,findOneRepair)
    .patch(protect, restrictTo('employee'),statusPendingExist,updateRepair)
    .delete(protect, restrictTo('employee'),statusPendingExist,deleteRepair)