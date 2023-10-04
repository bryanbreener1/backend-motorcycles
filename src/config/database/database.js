import { Sequelize } from "sequelize";
import { envs } from '../enviroments/enviroments.js'

const sequelize = new Sequelize(envs.DB_URI,{
    logging:false
})

export async function authenticate(){
    try {
        await sequelize.authenticate();
        console.log('conection has been stablished successfully');
    } catch(error) {
        throw new Error('authentication error: ', error)
    }
}

export async function syncUp(){
    try {
        await sequelize.sync()
        console.log('conection has been stablished successfully');
    } catch (error) {
        throw new Error('sincronization error: ', error)
    }
}

export default sequelize