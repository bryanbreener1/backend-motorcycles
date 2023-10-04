import  DataTypes, { ENUM }  from "sequelize";
import sequelize from "../config/database/database.js";

const User = sequelize.define('user',{
    id:{
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    email:{
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role:{
        type: ENUM('client', 'worker', 'admin', 'mmanager'),
        allowNull: false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    }

})

export default User