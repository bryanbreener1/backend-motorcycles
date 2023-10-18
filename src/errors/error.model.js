import sequelize from "../config/database/database.js";
import { DataTypes } from "sequelize";

const Error = sequelize.define('error', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
    status:{
        allowNull:true,
        type: DataTypes.STRING(10),
    },
    message: {
        allowNull:true,
        type:DataTypes.TEXT
    },
    stack:{
        type: DataTypes.TEXT,
        allowNull: true
    }
})

export default Error 