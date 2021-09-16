const request = require("request");
const db = require('../helpers/db');

module.exports = {
  fillData,
};

function getApiData() {
  return new Promise((resolve) => {
    request(
      "https://clinicalapi-cptac.esacinc.com/api/tcia/clinical_data/tumor_code/CCRCC",
      { json: true },
      (err, res, body) => {
        if (err) {
          // error handling 
        }
        resolve(body)
      }
    );
  });
}

 function fillData() {
  return new Promise( async (resolve) => {
     // call external api and feed data into the table
     const data = await getApiData();

     // sync all models with database
     await db.sequelize.sync({ force: true }).then(async () => {
      console.log(`Database & tables created!`);
  
    
      const AlterData = [];
      for (const e of data) {
        AlterData.push({
          case_id: e.case_id,
          tumor_site: e.tumor_site,
          BMI: e.BMI,
          height_in_cm: e.height_in_cm,
          weight_in_kg: e.weight_in_kg,
          gender: e.gender,
          age: e.age,
          tumor_size_in_cm: e.tumor_size_in_cm,
        });
      }
      db.Data.bulkCreate(AlterData, { returning: true })
        .then(function (res) {
          resolve(1);
        })
        .then(function (err) {});
    });
   });
   
}
