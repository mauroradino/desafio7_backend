import { Router } from "express";
import { userModel } from "../models/userModel.js";
import 'dotenv/config'
import bcrypt from 'bcrypt'
const usersRouter = Router()

usersRouter.post('/register', async (req, res) =>{
    const { email, password } = req.body;
    const encriptedPassword = (password) => bcrypt.hashSync(password, parseInt(process.env.SALT))

    try{
        const respuesta = await userModel.create({ first_name, last_name, age, email, encriptedPassword })
        res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
    }catch(error){
        res.status(400).send(error)
    }
})

export default usersRouter;
export {encriptedPassword };