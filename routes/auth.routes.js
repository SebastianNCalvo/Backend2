import { Router } from "express";

const router = Router();

// Declaración de rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/current', authenticateJWT, current);
router.post('/logout', logout);

export default router;