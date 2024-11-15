import mongoose from "mongoose";
import pkg from 'colors';
const { colors } = pkg;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`conexion exitosa a mongo${conn.connection.host}`.underline.green.bold)
    }catch(error){
        console.log(`Error al conectar a mongo ${error}`.red.bold)
        process.exit(1)
    }
}

export default connectDB;