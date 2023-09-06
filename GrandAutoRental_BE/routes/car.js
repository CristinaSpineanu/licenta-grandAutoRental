const express = require("express"); //importam express
const connection = require("../connection"); //importam connection
const router = express.Router(); //creeam un nou obiect Router pe care îl vom utiliza pentru a defini rutele aplicației noastre.

var auth = require("../services/authentication"); //importam fisierul authentication si checkRoleType
var checkRole = require("../services/checkRoleType");


//Add-car api
//va fi folosita doar de admin,deci avem nevoie atat de metoda pentru autentificareToken , cat si cea de verificare a rolului
router.post("/add-car", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
    let car = req.body;
    const queryInsert = "insert into car (name,categoryId, description,price,status) values (?,?,?,?,'true')"; 
    connection.query(queryInsert, [car.name,car.categoryId, car.description,car.price], (errorInsert, results) => { //al 2 lea argument al metodei connection.query() este un array de valori ce urm a fi inserate in query
      if (!errorInsert) {
        return res.status(200).json({ message: "Mașina a fost adaugată cu succes!" });
      } else {
        return res.status(500).json(errorInsert);
      }
    });
  });
  

//Get-cars api
//va fi folosita atat de user cat si de admin,deci nu avem nevoie sa verificam rolul
router.get("/get-cars", auth.autentificareToken, (req, res) => {
    const querySelect = "SELECT cr.id, cr.name, cr.description, cr.price, cr.status, cat.id AS categoryId, cat.name AS categoryName FROM car AS cr INNER JOIN category AS cat ON cr.categoryId = cat.id";
    connection.query(querySelect, (errorSelect, results) => {
      if (!errorSelect) {
        return res.status(200).json(results);
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  });


  //Get-by-category/:id Route
  //o sa trimitem categoryId si o sa returnam toate produsele care sunt conectate cu category id
  router.get("/get-by-category/:id", auth.autentificareToken, (req, res,next) => {
    const id=req.params.id;    //primim id-ul din params (din ruta)
    const querySelect = "SELECT id,name from car where categoryId=? and status='true'";
    connection.query(querySelect,[id], (errorSelect, results) => {
      if (!errorSelect) {
        return res.status(200).json(results);
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  });


// Get car by carId api
router.get("/get-by-car/:id", auth.autentificareToken, (req, res) => {
    const carId = req.params.id;
    const querySelect = "SELECT id, name, description, price FROM car WHERE id=?";
    connection.query(querySelect, [carId], (errorSelect, results) => {
      if (!errorSelect) {
        if (results.length === 0) {
          return res.status(404).json({ message: 'Mașina cu ID-ul specificat nu a fost găsită.' });
        }
        return res.status(200).json(results[0]);
      } else {
        return res.status(500).json(errorSelect);
      }
    });
  });
  
  // Update car api
  router.patch("/update-car", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
    const car = req.body;
    const queryUpdate = "UPDATE car set name=?, categoryId=?, description=?, price=? where id=?";
    connection.query(queryUpdate, [car.name, car.categoryId, car.description, car.price, car.id], (errorUpdate, results) => {
      if (!errorUpdate) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Mașina cu ID-ul specificat nu a putut fi găsită!' });
        }
        return res.status(200).json({ message: 'Datele despre mașină au fost modificate cu succes!' });
      } else {
        return res.status(500).json(errorUpdate);
      }
    });
  });

//Delete api 
router.delete("/delete-car/:id", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
    const carId = req.params.id;
    const queryUpdate = "DELETE from car where id=?";
    connection.query(queryUpdate, [ carId], (errorUpdate, results) => {
      if (!errorUpdate) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Mașina cu ID-ul specificat nu a putut fi găsită!' });
        }
        return res.status(200).json({ message: 'Datele despre mașină au fost șterse cu succes!' });
      } else {
        return res.status(500).json(errorUpdate);
      }
    });
  });



    //Update status api
    router.patch("/update-status", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
        const user = req.body;
        const queryUpdate = "UPDATE car set status=? where id=?";
        connection.query(queryUpdate, [user.status,user.id], (errorUpdate, results) => {
          if (!errorUpdate) {
            if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Mașina cu ID-ul specificat nu a putut fi găsită!' });
            }
            return res.status(200).json({ message: 'Statusul mașinii a fost modificat cu succes!' });
          } else {
            return res.status(500).json(errorUpdate);
          }
        });
      });

module.exports=router;
