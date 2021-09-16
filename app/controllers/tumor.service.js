const config = require('config.json');
const db = require('../helpers/db');
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');


module.exports = {
    getAll,
    getById
};

async function getAll() {
   return await db.Data.findAll();
}

async function getById(id) {
    return await getCase(id);
}

async function getCase(id) {
    const [results, metadata] =  await db.sequelize.query(
        'SELECT  case_id, tumor_site, BMI, age, height_in_cm, weight_in_kg FROM Tumors WHERE case_id = :case',
        {
          replacements: { case: id },
          type: QueryTypes.SELECT
        }
      );
   
    if (!results) throw 'Data not found';
    return results;
}

