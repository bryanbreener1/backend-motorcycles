import z from 'zod'
import {extractValidationData} from '../common/utils/extractErrorData.js'

export const repairsSchema = z.object({
    status: z.enum(['pending', 'completed', 'cancelled']).optional(),
    userId: z.number(),
    date: z.string(),
    motorsNumber: z.number(),
    description: z.string(),
})

export function validationRepairs(data){
    const result = repairsSchema.safeParse(data)
    const {hasError, errorMessages, data: repairsData} = extractValidationData(result)
    return{
        hasError,
        errorMessages,
        repairsData
    }
}


export function validationPartialRepairs(data){
    const result = repairsSchema.partial().safeParse(data)
    const {hasError, errorMessages, data: repairsData} = extractValidationData(result)
    return{
        hasError,
        errorMessages,
        repairsData
    }
}