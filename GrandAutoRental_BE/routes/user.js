//import express
const express = require("express");

//import connection
const connection = require("../connection");
const router = express.Router();

//Pentru ruta de logare
const jwToken = require("jsonwebtoken"); //cerem jw token
require("dotenv").config(); //importam environment file
//Pentru a genera jwtoken avem nevoie de o cheie secreta pentru criptare/decriptare

const nodemailer = require("nodemailer");

//Transport config
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
  debug: true, // Enable debugging
});


let auth=require('../services/authentication');
let checkRole=require('../services/checkRoleType');

//Singup api
router.post("/signup", (req, res) => {
  let user = req.body;
  querySelect = "select email,password,status,role from user where email= ?";
  connection.query(querySelect, [user.email], (errorSelect, results) => {
    //aici executam query-ul scris deasupra, se asteapta de la user un email [user.email]
    //daca apare o eroare va intra pe ramura de else
    if (!errorSelect) {
      if (results.length <= 0) {
        //inseamna ca user-ul nu exista (aceasta adresa de email nu e in baza de date)
        //de fiecare data cand adaugam un nou user, status-ul va fi 'false' pentru ca nu este logat-> daca este 'true' inseamna ca user-ul se poate loga
        queryInsert =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')"; //valorile care sunt cu ? vor fi adaugate din body
        connection.query(
          queryInsert,
          [user.name, user.contactNumber, user.email, user.password],
          (errorInsert, result) => {
            if (!errorInsert) {
              //daca nu exista nicio eroare primim status code-ul 200 => este un raspuns OK
              return res
                .status(200)
                .json({ message: "Înregistrarea s-a realizat cu succes!" });
            } else {
              //500 status code-ul pentru Internal Server Error, o eroare generica care spune ca a existat o problema care impiedica server-ul sa faca request-ul
              return res.status(500).json(errorInsert);
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Adresa de email există deja!" });
      }
    } else {
      //500 status code pentru Internal Server Error si returnam eroarea cu json(error)
      return res.status(500).json(errorSelect);
    }
  });
});

// Login api
router.post("/login", (req, res) => {
  let user = req.body;
  querySelect = "select email,password,status,role from user where email= ?";
  connection.query(querySelect, [user.email], (errorSelect, results) => {
    if (!errorSelect) {
      if (results.length <= 0 || user.password !== results[0].password) {
        //parola incorecta =>inseamna ca parola trimisa de utilizator nu este corecta
        return res.status(401).json({ message: "Email sau parolă incorectă!" });
      } else if (results[0].status === "false") {
        //daca status ='false' =>contul asteapta approval
        return res.status(401).json({
          message:
            "Contul tău nu a fost încă aprobat!\nUn administrator îl va verifica și îl va aproba cât mai curând posibil",
        });
      } else if (user.password === results[0].password) {
        //parola se potriveste ->generam token de logare
        const response = { email: results[0].email, role: results[0].role };
        const jwtAccessToken = jwToken.sign(
          response,
          process.env.JWT_SECRET_TOKEN,
          { expiresIn: "5h" }
        );

        res.status(200).json({ token: jwtAccessToken }); //aici returnam access token-ul
      } else {
        return res.status(400).json({
          message: "Ups! Ceva nu a mers bine!Te rugam încearcă din nou.",
        });
      }
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});

//Forgot-password api
router.post("/forgot-password", (req, res) => {
  const user = req.body;
  querySelect = "select email, password from user where email =?";
  connection.query(querySelect, [user.email], (errorSelect, results) => {
    if (!errorSelect) {
      if (results.length <= 0) {
        //inseamna ca rezultatul nu este in baza de date,
        //dar din motive de securitate nu vom trimit faptul ca acest email nu este in baza de date
        //ci vom trimite un mesaj de success
        return res
          .status(200)
          .json({ message: "Parolă primisă cu succes către tine!" });
      }

      //in cazul in care rezultatul (email-ul) a fost gasit in baza de date, vom trimite email-ul catre adresa respectiva
      var emailDetails = {
        from: process.env.MAILER_EMAIL,
        to: results[0].email,
        subject: "Informații despre parola ta!",
        html:
          `<div><p style="font-size:17px"><b>Detaliile despre parola ta <br></b></p>` +
          "<br>" +
          "<b>Email: </b>" +
          results[0].email +
          "<br><b>Password: </b>" +
          results[0].password +
          "<br>" +
          '<br><a href="http://localhost:4200/user/login/">Apasă aici pentru a te autentifica!</a></div>',
      };

      //chemam transporter pentru a trimite email-ul
      transporter.sendMail(emailDetails, function (error, info) {
        if (error) {
          console.log("A apărut o eroare" + error); //vom printa eroarea
        } else {
          console.log("Email-ul a fost trimis:" + info.response);
        }
      });

      return res
        .status(200)
        .json({ message: "Parola a fost trimisă cu succes către tine!" });
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});

//Change password route
router.post("/change-password", auth.autentificareToken, (req, res) => {
  const user = req.body;
  const email = res.locals.email; //primim email-ul din metoda auth.autentidicareToken
  const querySelect = "select * from user where email = ? and password = ?"; 

  connection.query(querySelect, [email, user.parolaVeche], (errorSelect, results) => {
    if (!errorSelect) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Parolă actuală incorectă!" });
      } else if (results[0].password === user.parolaVeche) {
        const queryUpdate = "update user set password = ? where email = ?"; 
        connection.query(queryUpdate, [user.parolaNoua, email], (errorUpdate, results) => {
          if (!errorUpdate) {
            return res.status(200).json({ message: "Parola a fost schimbată cu succes!" });
          } else {
            return res.status(500).json(errorUpdate);
          }
        });
      } else {
        return res.status(400).json({ message: "Ceva nu a mers bine. Încearcă din nou!" });
      }
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});


//Get all users (care au role de user) Route
router.get("/get-users",auth.autentificareToken,checkRole.verificaRolul,(req, res) => {
  var querySelect =
    "select id,name,email,contactNumber, status from user where role ='user'";
  connection.query(querySelect, (errorSelect, results) => {
    if (!errorSelect) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});

//Update user status Route , pentru ca facem modificari folosim patch
router.patch("/update-user", auth.autentificareToken,checkRole.verificaRolul,(req, res) => {
  let user = req.body;
  queryUpdate = "update user set status=? where id=?"; //query pt update
  connection.query(queryUpdate, [user.status, user.id], (errorUpdate, results) => {
    if (!errorUpdate) {
      if (results.affectedRows === 0) {
        //verificam daca randul a fost afectat
        //cand acest query a fost efectuat cu succes, atunci affectedRows va fi updatat cu 1
        //daca acesta ramane 0, inseamna ca nu a fost updatat row-ul si user-ul nu a fost gasit
        return res.status(404).json({ message: "User Id nu a putut fi găsit!" });
      }

      return res.status(200).json({ message: "User-ul a fost updatat cu succes!" });
    } else {
      return res.status(500).json(errorUpdate);
    }
  });
});

//Route pentru verificarea token-ului
router.post("/check-token", auth.autentificareToken, (req, res) => {
  // Daca am ajuns aici, inseamna ca token-ul a fost validat cu succes
  // și putem returna un raspuns cu statusul 200 și un mesaj JSON cu valoarea 'Token valid'
  return res.status(200).json({ message: "Token valid!" });
});


//export
module.exports = router;
