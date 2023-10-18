import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'

export const userSchema = z.object({
    name: z.string().min(3).max(99),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['client', 'employee'])
})

const loginUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email'}),
    password: z.string().min(8, { message: 'Password is too short' }),
})

export function validateUser(data){

    const result = userSchema.safeParse(data)

    const {hasError, errorMessages, data: usersData} = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        usersData
    }

}
 export function validatePartialUser(data){
    const result = userSchema.partial().safeParse(data)
    const {hasError, errorMessages, data: usersData} = extractValidationData(result)
    return{
        hasError,
        errorMessages,
        usersData
    }
 }


export const validateLogin = data => {
    const result = loginUserSchema.safeParse(data)
  
    const {
      hasError,
      errorMessages,
      data: userData,
    } = extractValidationData(result)
  
    return {
      hasError,
      errorMessages,
      userData
    }
  }
