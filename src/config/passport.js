import local from 'passport-local'
import passport from 'passport'
import { encriptedPassword } from '../routes/users.routes'
import { userModel } from '../models/userModel'

const LocalStatregy = local.Strategy;
const initPassport = () =>{
    passport.use('register', new LocalStatregy (
        { passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) =>{
            const {first_name, last_name, email, age} = req.body;

            try{
              const user = userModel.findOne({ email: email })
              if(user){
                return done(null, false)
              }

              const newEncriptedPassword = encriptedPassword(password)
              
            }catch(error){
                return done(error)
            }
        }
    ))
}