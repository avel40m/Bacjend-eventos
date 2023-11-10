import mongoose from 'mongoose';

const db = "mongodb://localhost:27017/santander";

const conectarDB = async () => {
    await mongoose.connect(db)
     .then(() => console.log("Base de datos conectada"))
     .catch(error => console.log("Error en la conexion: " + error))
}

export default conectarDB;