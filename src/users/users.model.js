import  DataTypes, { ENUM }  from "sequelize";
import sequelize from "../config/database/database.js";
import { encryptedPassword } from "../config/plugins/encrypPassword.plugin.js";

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
        type: ENUM('client', 'employee'),
        allowNull: false
    },
    status:{
        type:ENUM('available', 'disabled'),
        allowNull:false,
        defaultValue: 'available'
    }
},{
    hooks:{
        beforeCreate: async(user) => {
            user.password = await encryptedPassword(user.password)
        }
    }
})

export default User