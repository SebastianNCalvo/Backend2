import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser())

const coockeOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    signed: false
}

router.get('/setCookie', (req, res) => {
    const UserIngresado = 'Sebastian';
    res.cookie('userName', UserIngresado, coockeOptions);
    res.send(`Cookie establecida correctamente para ${UserIngresado}`);
    
})

router.get('/getCookie', (req, res) => {
    try {
        const userName = req.cookies.userName;
        if(!userName){
            res.status(400).send('No hay sesion iniciada')
        } else {
            res.send(`Bienvenido ${userName}`);
        }
    } catch (error) {
        
    }
    
})

router.delete('/deleteCookie', (req, res) => {
    res.clearCookie('userName')
    res.send('Cookie borrada')
})

export default router;