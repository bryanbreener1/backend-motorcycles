
import { AppError } from '../errors/appError.js'
import {RepairService} from './repairs.service.js'

const repairService = new RepairService()

export const statusPendingExist = async(req,res,next)=>{
    const {id} = req.params
    const repair = await repairService.findOneRepair(id)
    if(!repair){
        return next(new AppError(`service with id: ${id} not found`))
    }
    if(repair.status !== 'pending'){
        return next(new AppError(`service with id: ${id} exist but its status is not pending`))
    }
    req.repair = repair
    next()
}