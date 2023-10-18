import Repairs from "./repairs.model.js"

export class RepairService{
    async findAllRepairs (){
        return await Repairs.findAll() 
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