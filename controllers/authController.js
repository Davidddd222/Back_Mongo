import mongoose from 'mongoose'
import User from '../entities/user.entity.js'
import bcrypt from 'bcrypt';

export const userLogin=(req, res)=>{
    res.send("Logueo de usuarios")
}

export const userRegister= async(req, res)=>{
    //desescruturar el body
    const {firstName, 
           lastName,
           email,
           password,
           isAdmin
          } = req.body

    //verificar si el usuario existe por email
    const VUser = await User.findOne({email:req.body.email})
    if (VUser){
        res.status(400).json({
            message: "El usuario ya existe"
        })
    }else {


    //encriptar el password del body
    const sal = await bcrypt.genSalt(10)
    const bcPassword = await bcrypt.hash(password, sal)

    //crear el nuevo usuario
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password : bcPassword,
        isAdmin
    })
    res.status(201).json(newUser)
    }

}


//export default authController;

