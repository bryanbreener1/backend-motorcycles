import { catchAsync } from "../../errors/catchAsync.js"
import { validateLogin, validatePartialUser, validateUser } from "../users.schema.js"
import { UserService } from "../users.service.js"
import generateJWT from '../../config/plugins/generate-jwt.plugin.js'
import {AppError} from '../../errors/appError.js'
import { verifyPassword } from "../../config/plugins/encrypPassword.plugin.js"


const userService = new UserService()

export const register  = catchAsync(async(req, res,next) => {
    
    const {hasError, errorMessages, usersData} = validateUser(req.body)    
    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const user = await userService.createUser(usersData)
    
    const token = await generateJWT(user.id)
    return res.json({
        token,
        user:{
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            gender: user.gender  
        }
    })
})


export const login = catchAsync(async(req,res,next)=>{

    const {hasError, errorMessages, userData} = validateLogin(req.body)    
    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const user = await userService.findOneUserByEmail(userData.email)
    if(!user){
        return next(new AppError('invalid email or password',401))
    }
    
    const rightPassword = await verifyPassword(userData.password, user.password)

    if(!rightPassword){
        return next(new AppError('invalid email or password',401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user:{
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            gender: user.gender  
        }
    })


})

export const changePassword = catchAsync(async(req,res,next)=>{

})
