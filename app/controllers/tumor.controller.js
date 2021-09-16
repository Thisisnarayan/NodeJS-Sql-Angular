const express = require("express");
const router = express.Router();
const tumorService = require("./tumor.service");

// routes

router.get("/all", getAll);
router.get("/:id", getById);

module.exports = router;

function getAll(req, res, next) {
  tumorService
    .getAll()
    .then((data) => { 
      res.status(200).send({
        success: {
          message: "Data fetched successfully",
          data,
        },
      });
    })
    .catch(next);
}

function getById(req, res, next) {
  tumorService
    .getById(req.params.id)
    .then((data) =>
      res.status(200).send({
        success: {
          message: "Data fetched successfully",
          data,
        },
      })
    )
    .catch(next);
}


