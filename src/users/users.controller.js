import { AppError } from "../errors/appError.js";
import {catchAsync} from "../errors/catchAsync.js";
import { validatePartialUser, validateUpdate, validateUser } from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService()

export const findAllUsers  = catchAsync(async(req, res,next) => {
    const users = await userService.findAllUsers()
    return res.json(users)
})


export const findOneUser = catchAsync(async(req, res,next) => {
    const {user} = req
    return res.json(user)

})

export const deleteUser = catchAsync(async(req, res,next) => {
    const {sessionUser} = req
    const {user} = req
    if(sessionUser.id == user.id){
        await userService.deleteUser(user)
        return res.status(204).json(null)
    }

    return next(new AppError('you can not edit data from other user',403))

})

export const updateUser = catchAsync(async(req, res,next) => {

    const {hasError, errorMessages, userUpdateData} = validateUpdate(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            errorMessages
        })
    }
    const {sessionUser} = req
    const {user} = req

    if(sessionUser.id == user.id){
        await userService.updateUser(sessionUser, userUpdateData)

        return res.json({
            status: 'the data has been updated succesfully',
        })
    }
    return next(new AppError('you can not edit data from other user',403))
})