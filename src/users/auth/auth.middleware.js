import { envs } from "../../config/enviroments/enviroments.js";
import { AppError } from "../../errors/appError.js";
import { catchAsync } from "../../errors/catchAsync.js";
import jwt, { decode } from 'jsonwebtoken'
import { UserService } from "../users.service.js";
import { promisify } from 'util';

const userService = new UserService

 export const protect = catchAsync(async(req,res,next) => {
    //1. obtener el token
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')  
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
  
    //2. validad si el token existe
    if(!token){
        return next(new AppError('you are not logged in, please log in to get acces',401))
    }
    //3. decodificar el token
    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWT_SEED
    )
    //4. buscar el usuario dueño del token, y validar si existe
    const user = await userService.findOneUser(decoded.id)
    if(!user){
        return next( new AppError('The owner of this token is not longer available', 401))
    }
    //5. validar si el usuario cambio la contrase recientemente, si es asi enviar un error

    if(user.changedPasswordAt){
        const changedTimeStamp = parseInt(
            user.changedPasswordAt.getTime()/1000
        )
        if(decoded.iat < changedTimeStamp){
            return next(
                new AppError('User recently changed password!, please login again.', 401)
              )
        }
    }

    //6. adjuntar el usuario en session, el usuario en session es el usuario dueño del token
    req.sessionUser = user
    next()
 })

 export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.sessionUser.role)){
          return next(new AppError('this user does not have the right role to do this actions', 403))
        }
        next();
      }
 }