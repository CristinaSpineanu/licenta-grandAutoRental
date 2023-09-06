
require("dotenv").config(); // Încarcam pachetul dotenv pentru a putea folosi variabilele de mediu din fișierul .env

function verificaRolul(req,res,next){  
  // Verificam daca rolul utilizatorului din 'res.locals.role'
  // este acelasi cu valoarea din variabila de mediu 'process.env.USER'
  if (res.locals.role === process.env.USER) {
    // Daca rolul este acelasi, adica clientul are 
    //rolul de user simplu, trimitem statusul 401 (Unauthorized) catre client
    res.sendStatus(401);
  } else {
    // Daca rolul nu este acelasi, apelul catre 'next()' permite continuarea prelucrarii cererii
    next();
  }
}

module.exports={verificaRolul:verificaRolul};