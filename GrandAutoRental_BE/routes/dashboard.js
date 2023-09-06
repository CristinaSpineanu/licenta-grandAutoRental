
const express = require("express"); //importam express
const connection = require("../connection"); //importam connection
const router = express.Router(); //creeam un nou obiect Router pe care îl vom utiliza pentru a defini rutele aplicației noastre.
var auth = require("../services/authentication"); //importam fisierul authentication si checkRoleType

router.get("/overview", auth.autentificareToken, (req, res, next) => {
    let totalCategories;
    let totalCars;
    let totalBills;
    const querySelectTotalCategorie =
      "select count(id) as totalCategories from category";
    connection.query(querySelectTotalCategorie, (errorSelect, results) => {
      if (!errorSelect) {
        totalCategories = results[0].totalCategories;
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  
    const querySelectTotalCars = "select count(id) as totalCars from car";
    connection.query(querySelectTotalCars, (errorSelect, results) => {
      if (!errorSelect) {
        totalCars = results[0].totalCars;
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  
    const querySelectTotalBills = "select count(id) as totalBills from bill";
    connection.query(querySelectTotalBills, (errorSelect, results) => {
      if (!errorSelect) {
        totalBills = results[0].totalBills;
        let data = {
          category: totalCategories,
          car: totalCars,
          bill: totalBills,
        };
        return res.status(200).json(data);
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  });
  

  module.exports=router;
