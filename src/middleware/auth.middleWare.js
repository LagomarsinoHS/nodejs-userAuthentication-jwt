import jwt from 'jsonwebtoken';
import User from '../model/user.model.js'
const protect = async (req, res, next) => {
    const { authorization } = req.headers
    console.log(">>>", req.headers);
    //Si el request.authorization no  viene con authorization o ademas no parte con Bearer
    //Significa que no viene con token y por ende lo dejo pasar
    if (!authorization || !authorization.startsWith('Bearer')) return next()


    //Caso contrario, consigo el token
    const [Bearer, token] = authorization.split(' ')

    //Lo desencripto
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    //En el caso de que no sirva, le digo al user que no tiene permiso
    if (!decoded) {
        res.status(400).json({ msg: 'Unauthorized!' })
    }

    //Consigo el user con el id
    const user = await User.findById(decoded.id)

    //Lo agrego al req que pasará a la siguiente función por si se necesita hacer algo con el
    req.user = user
    next();
}

export default protect