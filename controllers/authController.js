import mongoose from 'mongoose'
import User from '../entities/user.entity.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
    // Desestructurar el body
    const { firstName, lastName, email, password, isAdmin } = req.body;

    // Verificar si el usuario existe por email
    const VUser = await User.findOne({ email: req.body.email });
    if (VUser) {
        return res.status(400).json({
            message: "El usuario ya existe"
        });
    } else {
        // Encriptar el password del body
        const sal = await bcrypt.genSalt(10);
        const bcPassword = await bcrypt.hash(password, sal);

        // Crear el nuevo usuario
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcPassword,
            isAdmin,
        });

        const token = generarToken(newUser._id);

        const userResponse = {
            ...req.body,
            id: newUser._id,
            createdAt: newUser.createdAt,
            token
        };

        return res.status(201).json(userResponse);
    }
};

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
    
}

const generarToken = (id) => {
    return jwt.sign({id}, 
                    process.env.JWT_SECRET,
                    {expiresIn: "30d"})
}
