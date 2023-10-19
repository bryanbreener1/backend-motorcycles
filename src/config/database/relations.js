import Repairs from "../../repairs/repairs.model.js";
import User from "../../users/users.model.js";

export const initModel = () => {
    User.hasMany(Repairs, {foreignKey: 'user_id'})
    Repairs.belongsTo(User, {foreignKey: 'user_id', as:'user'})
}