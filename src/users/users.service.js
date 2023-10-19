import User from "./users.model.js"

export class UserService{

    async findAllUsers(){
        return await User.findAll({
            where:{
                status: 'available'
            },
            attributes:{
                exclude:['password']
            }

        })
    }

    async createUser(data){
        return await User.create(data)
    }

    async findOneUser(id){
        return await User.findOne({
            where:{
                id,
                status: 'available'
            },
            attributes:{
                exclude:['password']
            }
        })
    }

    async updateUser(user, data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({status: 'disabled'})
    }

    async findOneUserByEmail(email){
        return await User.findOne({
            where:{
                email,
                status:'available'
            },
        })
    }
}