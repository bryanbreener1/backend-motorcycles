import Repairs from "../../repairs/repairs.model.js";
import User from "../../users/users.model.js";

export const initModel = () => {
    Repairs.hasMany(User, {foreignKey: 'user_id'})
    User.hasMany(Repairs, {foreignKey: 'user_id'})
}