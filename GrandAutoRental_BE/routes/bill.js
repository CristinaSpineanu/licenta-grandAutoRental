const express = require("express"); //importam express
const connection = require("../connection"); //importam connection
const router = express.Router(); //creeam un nou obiect Router pe care îl vom utiliza pentru a defini rutele aplicației noastre.

let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const fs = require("fs");
const uuid = require("uuid");

var auth = require("../services/authentication"); //importam fisierul authentication si checkRoleType
const { error } = require("console");


// Generate-report Route
router.post("/generate-report", auth.autentificareToken, (req, res) => {
  const generateUuid = uuid.v1();
  const orderDetails = req.body;
  var carDetailsReport = JSON.parse(orderDetails.carDetails);

  const queryInsert =
    "insert into bill (name, uuid, email, contactNumber, paymentMethod, startDate, endDate, total, carDetails, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
 
  connection.query(
    queryInsert,
    [
      orderDetails.name,
      generateUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.startDate,
      orderDetails.endDate,
      orderDetails.totalAmount,
      orderDetails.carDetails,
      res.locals.email,
    ],
    (errorInsert, results) => {
      if (!errorInsert) {
        ejs.renderFile(
          path.join(__dirname, "", "bill-report.ejs"),
          {
            carDetails: carDetailsReport,
            name: orderDetails.name, 
            email: orderDetails.email, 
            contactNumber: orderDetails.contactNumber, 
            paymentMethod: orderDetails.paymentMethod,
            startDate: orderDetails.startDate,
            endDate: orderDetails.endDate,
            totalAmount: orderDetails.totalAmount,
          },
          (errorRenderFile, html) => {
            if (!errorRenderFile) {
              pdf.create(html).toFile(
                "./generated-pdf/" + generateUuid + ".pdf",
                function (error, data) {
                  if (error) {
                    console.log(error);
                    return res.status(500).json(error);
                  } else {
                    return res.status(200).json({ uuid: generateUuid });
                  }
                }
              );
            } else {
              return res.status(500).json(errorRenderFile);
            }
          }
        );
      } else {
        return res.status(500).json(errorInsert);
      }
    }
  );
});

//Get-pdf Api
router.post("/get-report-pdf", auth.autentificareToken, (req, res) => {
  const orderDetails = req.body;
  const pdfPath = "./generated-pdf/" + orderDetails.uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    var carDetailsReport = JSON.parse(orderDetails.carDetails);
    ejs.renderFile(
      path.join(__dirname, "", "bill-report.ejs"),
      {
        carDetails: carDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        startDate: orderDetails.startDate,
        endDate: orderDetails.endDate,
        totalAmount: orderDetails.totalAmount,
      },
      (errorRenderFile, html) => {
        if (!errorRenderFile) {
          pdf
            .create(html)
            .toFile(
              "./generated-pdf/" + orderDetails.uuid + ".pdf",
              (error, data) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json(error);
                } else {
                  //daca pdf-ul nu exista, o sa il returnam
                  res.contentType("application/pdf");
                  fs.createReadStream(pdfPath).pipe(res);
                }
              }
            );
        }
      }
    );
  }
});

//Get-all-bills Api
router.get("/get-all-bills", auth.autentificareToken, (req, res) => {
  const querySelect = "select * from bill  order by id Desc";
  connection.query(querySelect, (errorSelect, results) => {
    if (!errorSelect) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(errorSelect);
    }
  });
});

//Get-user-bill by email from auth
router.get("/get-user-bill", auth.autentificareToken, (req, res) => {
  const email = req.query.email; //Email ul exact in query params in FE
  const querySelect = "SELECT * FROM bill WHERE email = ?";

  connection.query(querySelect, [email], (errorSelect, results) => {
    if (!errorSelect) {
      console.log("Query executed successfully:", results);
      return res.status(200).json(results);
    } else {
      console.log("Query error:", errorSelect);
      return res.status(500).json(errorSelect);
    }
  });
});

//Delete bill Api
router.delete("/delete-bill/:id", auth.autentificareToken, (req, res, next) => {
  const id = req.params.id;
  const queryDelete = "delete from bill where id=?";
  connection.query(queryDelete, [id], (errorDelete, results) => {
    if (!errorDelete) {
      if (results.affectedRows === 0) {
        //inseamna ca, query-ul nu a putut fi aplicat
        return res
          .status(200)
          .json({ message: "Chitanța cu id-ul: " + id + " nu a fost găsită!" });
      }
      return res
        .status(200)
        .json({ message: "Chitanța a fost ștearsă cu succes!" });
    } else {
      return res.status(500).json(errorDelete);
    }
  });
});

module.exports = router;



router.post("/generate-report", auth.autentificareToken, (req, res) => {
  const generateUuid = uuid.v1();// Generăm un UUID unic pentru fiecare raport generat
  const orderDetails = req.body; // Obținem detalii despre comandă din corpul requestului
  var carDetailsReport = JSON.parse(orderDetails.carDetails); // Parsăm detaliile despre mașină din formatul JSON la un obiect

  const queryInsert =
    "insert into bill (name, uuid, email, contactNumber, paymentMethod, startDate, endDate, total, carDetails, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(  // Executăm interogarea folosind conexiunea la baza de date
    queryInsert,
    [
      orderDetails.name,
      generateUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.startDate,
      orderDetails.endDate,
      orderDetails.totalAmount,
      orderDetails.carDetails,
      res.locals.email, // Folosim res.locals pentru a obține emailul utilizatorului autentificat
    ],
    (errorInsert, results) => {
      if (!errorInsert) {
        // Dacă inserarea în baza de date s-a făcut cu succes, generăm raportul PDF
        ejs.renderFile(
          path.join(__dirname, "", "bill-report.ejs"),
          {
            carDetails: carDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            startDate: orderDetails.startDate,
            endDate: orderDetails.endDate,
            totalAmount: orderDetails.totalAmount,
          },
          (errorRenderFile, html) => {
            if (!errorRenderFile) {
              // Generăm PDF-ul din HTML-ul generat
              pdf.create(html).toFile(
                "./generated-pdf/" + generateUuid + ".pdf",
                function (error, data) {
                  if (error) {
                    console.log(error);
                    return res.status(500).json(error);
                  } else {
                    // Returnăm UUID-ul raportului generat în răspunsul către client
                    return res.status(200).json({ uuid: generateUuid });
                  }
                }
              );
            } else {
              return res.status(500).json(errorRenderFile);
            }
          }
        );
      } else {
        return res.status(500).json(errorInsert);
      }
    }
  );
});
