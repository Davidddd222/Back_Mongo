import express from 'express';

const pruebaRouter = express.Router()

//primera ruta rest en express
pruebaRouter.get("/saludo", (solicitud, respuesta)=> {
    respuesta.send("hola 2902093")
})

//ruta de post
pruebaRouter.post("/registro", (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        "mensaje": "registro exitoso",
        "datos" : {
            "email": req.body.email,
            "password": req.body.password
        }
    })
})


export default pruebaRouter; 