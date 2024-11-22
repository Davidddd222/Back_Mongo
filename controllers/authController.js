import mongoose from 'mongoose'
import User from '../entities/user.entity.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
//export default authController;
}

export const userLogin =  async (req, res) => {
    const {email, password} = req.body
    //encontrar el usuario por email
    const user = await User.findOne({email})
    if (user ) {
        //hash(request, mongo)
    if ( await bcrypt.compare(password, user.password)){
        res.status(200).json ({
            id : user.id,
            name: user.firstName,
            token: generarToken(user.id)
        })
        
    } else {
        res.status(404).json({
            "message": "Credenciales invalidas"
        })
    }

    }  else {
        res.status(404).json({
            "message": "El usuario no existe"
        })
    

    }
    res.json(user)   

}

const generarToken = (id) => {
    return jwt.sign({id}, 
                    process.env.JWT_SECRET,
                    {expiresIn: "30d"})
}
