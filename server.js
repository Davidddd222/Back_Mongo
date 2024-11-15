import pkg from 'colors';
const { colors } = pkg;
import dotenv from 'dotenv';
import express, { response } from 'express';
import pruebaRouter from './routes/pruebaRoutes.js';
import authRouter from './routes/auhtRouter.js';
import connectDB from './config/db.js';

//leer de el .env
dotenv.config()
connectDB()

//crear el objeto aplicacion de expresion
const app = express()

//configurar app para que acepte bodys en json
app.use(express.json())
const PORT = process.env.PORT

//rutas
app.use('/api/pruebas', pruebaRouter)
app.use('/api/auth', authRouter)

//crear servidor express
app.listen(PORT, ()=> {
    console.log(`Ejecutando servidor: ${PORT}`.cyan.bold)
})