import { Router } from "express";
import authRoutes from './auth.routes.js'

const router = Router();
router.get('/', (req, res) =>{
    res.status(200).json( {title: 'Bienvenidos a los enrutadores'})
})

router.use('/auth', authRoutes);

export default router;