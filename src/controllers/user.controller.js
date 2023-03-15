import express from "express";
import User from '../model/user.model.js'
import generateToken from "../utils/generateToken.js";


const getUsers = async (req, res) => {
    const Users = await User.find()
    res.json(Users)
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newUser = await User.create({ name, email, password })
        res.json(newUser)
    } catch (error) {
        console.log("err", error);
        res.status(400).json({ msg: 'User already exists.' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        //Consigo el usuario de la bd
        const user = await User.findOne({ email })
        //con ese usuario conseguido, agarro el metodo que cree en el modelo
        if (!await user.matchPassword(password)) {
            return res.json({ msg: 'invalid credentials.' })
        }
        return res.json({
            msg: 'Logged in!',
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        console.log("err", error);
    }
}

export {
    getUsers,
    createUser,
    loginUser
}