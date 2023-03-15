import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Esta opción crea automaticamente createAt y updateAt cuando se crea un registro
})


// Podemos crear un metodo que antes de guardar un registro haga algo
userSchema.pre('save', async function () {
    const user = this
    if (!user.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hashSync(user.password, salt)
})

// O un metodo asociado al user
userSchema.methods.matchPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}



const User = mongoose.model('users', userSchema);
export default User;