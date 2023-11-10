const mongoose = require('mongoose');

const db = "mongodb+srv://dbAuth:0jQHzsKnkz6jE3X9@cluster0.bwvof.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db)
    .then(() => console.log("Base de datos conectada"))
    .catch(error => console.log("Error en la conexion: " + error))
