import express from 'express';
import homeRouter from './routes/home.router.js';
import { connectMongoDB } from './config/db/connect.config.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

app.use('/api', homeRouter);

app.use((req, res) =>{
    res.status(404).json({title: '404 - pagina no encontrada'})
})

const startServer = async () => {
    await connectMongoDB('local');
    app.listen(PORT, () => console.log(`✅ Servidor funcionando con express en http://localhost:${PORT}`));
}

startServer();