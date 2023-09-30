import Express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { engine } from 'express-handlebars'
import _dirname from './path.js';
import 'dotenv/config'
import usersRouter from "./src/routes/users.routes.js";
import sessionRouter from './src/routes/session.routes.js';
import path from 'path'
import mongoose from 'mongoose';



const app = Express();
const PORT = 7070;

mongoose.connect(process.env.MONGOURL)
.then(async ()=> {
  console.log("BDD Conectada");  
})
.catch((error)=> console.log(error))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: {
            useNewUrlParser: true, //Establezco que la conexion sea mediante URL
            useUnifiedTopology: true //Manego de clusters de manera dinamica
        },
        ttl: 30 //Duracion de la sesion en la BDD en segundos

    }),
    secret: process.env.SESSION_CODE,
    resave: false, //Fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false //Fuerzo a guardar la session a pesar de no tener ningun dato
}))


app.use(Express.json())
app.engine('handlebars', engine())
app.set('views', _dirname + 'views');
app.set('views', path.resolve(_dirname, './src/views'))
app.set('view engine', 'handlebars')
app.use('/register', Express.static(path.join(_dirname, './src/public'))) //Unir rutas en una sola concatenandolas
app.use('/login', Express.static(path.join(_dirname, './src/public'))) //Unir rutas en una sola concatenandolas
app.use('/api/users', usersRouter)
app.use('/api/session', sessionRouter)
app.use(cookieParser(process.env.COOKIE_CODE))


app.get('/register', (req, res) => {
    const { email, password } = req.body
    req.session.email = email
    req.session.password = password
    console.log(req.session.email)
    console.log(req.session.password)
    res.render('register',{
        css: "css/login.css",
        js: "js/login.js"
    })

})

app.get('/login', (req, res)=>{
    res.render('login',{
        css: "css/login.css"
    })
})

const auth = (req, res, next) => {
    if (req.session.email === "admin@admin.com" && req.session.password === "1234") {
        return next() //Continua con la siguiente ejecucion
    }
    else{
        res.send("No tenes acceso a esta ruta")
    }
}



app.get('/admin', auth, (req, res) => {
    res.send('Sos admin')
})

app.get('/setCookie', (req, res)=>{
    res.cookie('CookieCookie', "Es una cookie", { signed: true, maxAge: 10000})
    res.send(req.signedCookies)
})

app.get('/session', (req, res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Se visito la pagina ${req.session.counter} veces`)
    }
    else{
        req.session.counter = 1;
        res.send("Bienvenido por primera vez")
    }
})

app.listen(PORT, () =>{ 
  console.log(`Server on port ${PORT}`)
})