import express from 'express';
import 'dotenv/config';
import { connectMongoDB } from './config/db/connect.config.js';

import homeRouter from './routes/home.router.js';

import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import cookieRouter from './routes/cookie/cookie.router.js'

import sessionRouter from './routes/session/session.router.js'

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/cookie', cookieRouter);
app.use('/api/session', sessionRouter)

app.use('/', homeRouter);

app.use('/api/user', userRouter);

app.use((req, res) =>{
    res.status(404).json({title: '404 - pagina no encontrada'})
})

const startServer = async () => {
    await connectMongoDB('local');
    app.listen(PORT, () => console.log(`✅ Servidor funcionando con express en http://localhost:${PORT}`));
}


startServer();