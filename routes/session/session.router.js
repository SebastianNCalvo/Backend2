import { Router } from "express";
import session from "express-session";
import isAuthenticated from "../cookie/isAuthenticated.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const router = Router();

const sessionSecret = process.env.sessionSecret;
console.log(process.env.sessionSecret);

const sessionConfig = {
    name: "clase1",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.mongoUrlLocal,
        ttl:14*24*60*60
    }),
    cookie: {
        maxAge: 60*60*1000,
        httpOnly: true,
        secure:false
    }
}

const adminUser = {
  username: "admin",
  password: "1234",
  role: "admin",
};


router.use(session(sessionConfig));

router.post('/login', (req, res) => {
    const {username, password } = req.body;

    if(!username || username === "" || !password || password === "") return res.status(401).json({mgs: "Ingrese ambos campos"})

    if(username !== adminUser.username || password !== adminUser.password) {
        return res.status(401).json({msg: 'Las credenciales no son validas'})
    }

    return req.session.regenerate((error) => {
        if (error) {
            return res.status(500).json({error: "No se pudo iniciar la sesion."});
        }

        req.session.user ={
            username: adminUser.username,
            role: adminUser.role,
            loggedAt: new Date().toISOString()
        }
        return res.status(200).json({msg: 'Login exitoso', user: req.session.user})
    })
})

router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        return res.status(200).json({msg:`Bienvenido ${req.session.user.username}`, products: products});
    } catch (error) {
        return res.status(401).json({msg: 'No hay session iniciada', error});
    }
})

router.delete('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).json({msg: 'No se cerro la session', err});
        }
        res.clearCookie('clase1', {httpOnly: true, secure: 'production', sameSite: 'lax'});

        return res.status(200).json({msg: 'Logout exitoso'})
    })

})

export default router;