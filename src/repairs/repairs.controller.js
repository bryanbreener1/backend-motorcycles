import { RepairsService } from "./repairs.service.js";

const repairService = new RepairsService()

export const findAllRepairs = async(req, res) => {
    try {
        const repairs = await repairService.findAllRepairs()
        return res.json(repairs)
    } catch (error) {
        return res.status(500).json.error
    }
}

export const createRepair = async(req, res) => {
    try {
        const data = req.body
        const repair = await repairService.createRepair(data)
        return res.json(repair)
    } catch (error) {
        return res.status(500).json.error
    }
}
export const findOneRepair = async(req, res) => {
    try {
        const {id} = req.params
        const repair = await repairService.findOneRepair(id)
        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} not found`
            })
        }
        if(repair && repair.status == 'pending'){
            return res.json(repair)
        }
        else if(repair.status !== 'pending'){
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} is not in pending status`
            })
        }

    } catch (error) {
        return res.status(500).json.error
    }
}

export const updateRepair = async(req, res) =>{
    try {
        const data = req.body
        const {id} = req.params
        const repair = await repairService.findOneRepair(id)
        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} not found`
            })
        }
        if(repair && repair.status == 'pending'){
            const repairUpdated = await repairService.updateRepair(repair, data)
            return res.json(repairUpdated)
        }
        else if(repair.status !== 'pending'){
            if(repair.status == 'cancelled'){
                return res.status(404).json({
                    status: 'error',
                    message: `repair with id ${id} can't be changed beacuse is already cancelled`
                })
            }
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} can't be changed because is already completed`
            })
        }

    } catch (error) {
        return res.status(500).json.error
    }
}

export const deleteRepair = async(req, res) =>{
    try {
        const {id} = req.params
        const repair = await repairService.findOneRepair(id)
        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} not found`
            })
        }
        if(repair && repair.status == 'pending'){
            await repairService.deleteRepair(repair)
            return res.status(204).json(null)
        }
        else if(repair.status !== 'pending'){
            return res.status(404).json({
                status: 'error',
                message: `repair with id ${id} is not in pending status`
            })
        }
    } catch (error) {
        return res.status(500).json.error
    }
}
