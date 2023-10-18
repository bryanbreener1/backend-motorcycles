import { AppError } from "../errors/appError.js";
import { UserService } from "./users.service.js";

const userService = new UserService()

export const userExist = async(req,res,next) =>{
    const {id} = req.params
    const user = await userService.findOneUser(id)
    if(!user){
        return next(new AppError(`the user with id: ${id} does not exist`))
    }
    req.user = user
    next()
}