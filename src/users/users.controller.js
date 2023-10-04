import { UserService } from "./users.service.js";

const userService = new UserService()

export const findAllUsers  = async(req, res) => {
    try {
        const users = await userService.findAllUsers()
        return res.json(users)
    } catch (error) {
        return res.status(500).json.error
    }
}

export const findOneUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await userService.findOneUser(id)
        if(user){
            return res.json(user)
        }
        return res.status(404).json({
            status: 'error',
            message: `user with id: ${id} not found`
        })
    } catch (error) {
        return res.status(500).json.error
    }
}

export const createUser = async(req, res) => {
    try {
        const data = req.body
        const users = await userService.findAllUsers()
        let email = []
        users.map(user => {
            email.push(user.email)
        })

        if(email.includes(data.email)){
            return res.status(404).json({
                status: 'error',
                message: `the user with email: ${data.email} is already registered`
            })
        }
        const user =  await userService.createUser(data)
        return res.json(user)

        
    } catch (error) {
        res.status(500).json.error
    }
}

export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await userService.findOneUser(id)

        if(user){
            userService.deleteUser(user)
            return res.status(204).json(null)
        }
        return res.status(404).json({
            status: 'error',
            message: `user with id: ${id} not found`
        })
    } catch (error) {
        res.status(500).json.error
    }
}

export const updateUser = async(req, res) => {
    try {
        const data = req.body
        const {id} = req.params
        const user = await userService.findOneUser(id)
        if(user){
            const userUpdated = userService.updateUser(user, data)
            return res.json(userUpdated)
        }
        return res.status(404).json({
            status: 'error',
            message: `user with id: ${id} not found`
        })
    } catch (error) {
        
    }
}