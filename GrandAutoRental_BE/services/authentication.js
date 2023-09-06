require("dotenv").config(); // Încarcam pachetul dotenv pentru a putea folosi variabilele de mediu din fișierul .env
const jwToken = require("jsonwebtoken"); // Importam pachetul jsonwebtoken pentru a lucra cu token-uri JWT (JSON Web Token)


// Definim funcția middleware 'authenticateToken'
function autentificareToken(req, res, next) {
  const authHeader = req.headers["authorization"];  // Obținem header-ul 'Authorization' din cererea HTTP
  const token = authHeader && authHeader.split(" ")[1];   // Obținem token-ul JWT din header, despartind header-ul la spațiul dintre 'Bearer' și token


  if (token == null) {  // Verificam daca token-ul este prezent sau nu
    // Daca token-ul nu este prezent, returnam statusul 401 - Unauthorized
    return res.sendStatus(401);
  }

  jwToken.verify(token, process.env.JWT_SECRET_TOKEN, (error, response) => {  // Verificam validitatea token-ului JWT utilizând cheia secreta din fișierul .env
    // Verificam daca a aparut vreo eroare în timpul validarii token-ului
    if (error) {
      // Daca exista o eroare, returnam statusul 403 - Forbidden
      return res.sendStatus(403);
    }
    // Daca token-ul este valid, setam payload-ul decodat în obiectul 'res.locals' și apelam funcția 'next' pentru a continua prelucrarea cererii
    res.locals = response;
    next();
  });
}

// Exportam funcția 'autentificareToken' pentru a o putea folosi în alte module
module.exports = { autentificareToken: autentificareToken };
