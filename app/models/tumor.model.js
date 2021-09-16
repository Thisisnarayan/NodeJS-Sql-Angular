const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        case_id: { type: DataTypes.STRING, allowNull: false },
        tumor_site: { type: DataTypes.STRING, allowNull: true },
        BMI: { type: DataTypes.FLOAT, allowNull: true },
        height_in_cm: { type: DataTypes.FLOAT, allowNull: true },
        weight_in_kg: { type: DataTypes.FLOAT, allowNull: true },
        gender :  { type: DataTypes.STRING, allowNull: true },
        age :  { type: DataTypes.STRING, allowNull: true },
        tumor_size_in_cm:  { type: DataTypes.FLOAT, allowNull: true }
    };
  
    return sequelize.define('Tumor', attributes );
}