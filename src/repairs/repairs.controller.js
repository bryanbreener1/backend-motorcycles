import { RepairService } from "./repairs.service.js";
import {validationPartialRepairs, validationRepairs} from './repairs.schema.js'
import { catchAsync } from "../errors/catchAsync.js";


const repairService = new RepairService()

export const findAllRepairs = catchAsync(async(req, res, next) => {

    const repairs = await repairService.findAllRepairsWithAllData()
    return res.json(repairs)

})

export const createRepair = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, repairsData} = validationRepairs(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            errorMessages
        })
    } 
    const repair = await repairService.createRepair(repairsData)
    return res.json(repair)

}) 


export const findOneRepair = catchAsync(async(req, res, next) => {
    const {repair} = req
    return res.json(repair)
})

export const updateRepair = catchAsync(async(req, res, next) =>{

    const {repair} = req
    const repairUpdated = await repairService.updateRepair(repair)
    res.json(repairUpdated)

})

export const deleteRepair = catchAsync(async(req, res, next) =>{

    const {repair} = req
    await repairService.deleteRepair(repair)
    res.status(204).json(null)
    
})
