import { Router } from "express";
import {
    findAllRepairs,
    createRepair,
    findOneRepair,
    updateRepair,
    deleteRepair
} from './repairs.controller.js'
import { statusPendingExist } from "./repairs.middleware.js";

export const router = Router()

router
    .route('/')
    .get(findAllRepairs)
    .post(createRepair)

router
    .route('/:id')
    .get(statusPendingExist,findOneRepair)
    .patch(statusPendingExist,updateRepair)
    .delete(statusPendingExist,deleteRepair)