import mongoose from "mongoose";

const UserSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "Nombre requerido"]
    },

    lastName: {
        type: String,
        required: [true, "Apellido requerido"]
    },

    email: {
        type: String,
        required: [true, "Correo requerido"],
        unique: [true, "El correo ya está en uso"]
    },

    password: {
        type: String,
        required: [true, "Contraseña requerida"]
    },

    isAdmin: {
        type: Boolean,
        required: [true, "isAdmin es requerido"],
        default: false
    }
},

{
    timestamps: true
}


);

const User = mongoose.model("User", UserSchema)

export default User 