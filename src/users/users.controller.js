import {catchAsync} from "../errors/catchAsync.js";
import { validatePartialUser, validateUser } from "./users.schema.js";
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
    const {user} = req 
    await userService.deleteUser(user)
    return res.status(204).json(null)

})

export const updateUser = catchAsync(async(req, res,next) => {
    const {hasError, errorMessages, usersData} = validatePartialUser(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            errorMessages
        })
    }

    const {user} = req

    const userUpdated = await userService.updateUser(user, usersData)
    return res.json(userUpdated)

})