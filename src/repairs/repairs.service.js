import Repairs from "./repairs.model.js"
import User from "../users/users.model.js"
import { Op } from "sequelize"


export class RepairService{
    async findAllRepairsWithAllData (){
        return await Repairs.findAll({
            where:{
                status:{
                    [Op.in]: ['completed', 'pending']
                }
            },
            include: {
                model:User,
                as: 'user',
                attributes: ['name']
            }
        }) 
    }
    async createRepair(data){
        return await Repairs.create(data)
    }
    async findOneRepair(id){
        return await Repairs.findOne({
            where:{
                id            
            }
        })
    }
    async updateRepair(repair){
        return await repair.update({status:'completed'})
    }
    async deleteRepair(repair){
        return await repair.update({status: 'cancelled'})
    }
}