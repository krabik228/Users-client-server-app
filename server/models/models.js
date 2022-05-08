import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

export default sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, uniqueL: true },
    password: { type: DataTypes.STRING },
})

