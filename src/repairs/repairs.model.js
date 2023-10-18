import { DataTypes, ENUM, INTEGER } from "sequelize";
import sequelize from '../config/database/database.js'
import User from '../users/users.model.js'


const Repairs = sequelize.define('repairs',{
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull:false,
        field: 'repairs_id'
    },
    date:{
        allowNull:false,
        type: DataTypes.DATE,
    },
    motorsNumber:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field: 'motors_number'
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    status:{
        allowNull: false,
        type: ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
    userId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id'
    }
})



export default Repairs