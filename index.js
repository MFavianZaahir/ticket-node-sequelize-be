const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors
const app = express() //implementasi express


app.listen(8000, () => {
    console.log("Server run on port 8000");
    })
    