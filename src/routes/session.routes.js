import { Router } from "express";
import { userModel } from "../models/userModel.js";

const sessionRouter = Router ();

sessionRouter.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    try{
        if(req.session.user){
            res.redirect(301, '/static')
            console.log("ya hay una session")
        }
        else{
        const respuesta = await userModel.findOne({email: email})
        if(respuesta === null){
            res.status(404).send("Usuario no encontrado")
        }else{
            if(respuesta.password === password){
                req.session.user = respuesta
                res.send("Logueado Correctamente")
            }
            else{
                res.send("Contraseña incorrecta")
            }
        }
    }

    }catch(error){
      res.status(404).send(`Error ${error}`)
      console.log(error)
    }

})

export default sessionRouter;   