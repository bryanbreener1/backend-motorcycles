import { router as userRouter} from "../users/users.route.js";
import { router as repairsRouter } from "../repairs/repairs.route.js";
import { Router } from "express";

export const router = Router()

router.use('/users', userRouter)
router.use('/repairs', repairsRouter)
