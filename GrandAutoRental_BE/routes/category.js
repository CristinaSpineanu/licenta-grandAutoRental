const express = require("express"); //importam express
const connection = require("../connection"); //importam connection
const router = express.Router(); //creeam un nou obiect Router pe care îl vom utiliza pentru a defini rutele aplicației noastre.

var auth = require("../services/authentication"); //importam fisierul authentication si checkRoleType
var checkRole = require("../services/checkRoleType");



//Add-category api
//va fi folsoita doar de admin,deci avem nevoie atat de metoda pentru autentificareToken , cat si cea de verificare a rolului
router.post("/add-category", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
    let category = req.body;
    const queryInsert = "insert into category (name) values (?)"; 
    connection.query(queryInsert, [category.name], (errorInsert, results) => { //al 2 lea argument al metodei connection.query() este un array de valori ce urm a fi inserate in query
      if (!errorInsert) {
        return res.status(200).json({ message: "Categoria a fost adaugată cu succes!" });
      } else {
        return res.status(500).json(errorInsert);
      }
    });
  });
  

//Get-categories api
//va fi folsoita atat de user cat si de admin,deci nu avem nevoie sa verificam rolul
router.get("/get-categories", auth.autentificareToken, (req, res) => {
  const querySelect = "select * from category order by name"; //aici nu asteptam nimic de la user, nimic in body
  connection.query(querySelect, (errorSelect, results) => {
    if (!errorSelect) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});

//Update-category api
//Aceasta va fi disponibila doar pentru admini
router.patch("/update-category",auth.autentificareToken,checkRole.verificaRolul,(req, res) => {
    let produs = req.body;
    const queryUpdate = "update category set name=? where id=?"; //query pt update
    connection.query(queryUpdate,[produs.name, produs.id],(errorUpdate, results) => {
        if (!errorUpdate) {
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Categoria nu a fost gasită!" });
          }
          return res.status(200).json({ message: "Categoria a fost modificată cu succes!" });
        } else {
          return res.status(500).json(errorUpdate);
        }
      }
    );
  }
);


//Delete api 
router.delete("/delete-category/:id", auth.autentificareToken, checkRole.verificaRolul, (req, res) => {
  const carId = req.params.id;
  const queryUpdate = "DELETE from category where id=?";
  connection.query(queryUpdate, [ carId], (errorUpdate, results) => {
    if (!errorUpdate) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Categoria cu ID-ul specificat nu a putut fi găsită!' });
      }
      return res.status(200).json({ message: 'Datele despre categorie au fost șterse cu succes!' });
    } else {
      return res.status(500).json(errorUpdate);
    }
  });
});

module.exports=router;
