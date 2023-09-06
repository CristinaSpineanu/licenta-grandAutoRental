require("dotenv").config(); //importam .env file
const http = require("http");
const app = require("./index"); //importam index.js

const server = http.createServer(app);
server.listen(process.env.PORT);
