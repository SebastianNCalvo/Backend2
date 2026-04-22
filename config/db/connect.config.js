import mongoose from "mongoose";

export const connectMongoDB = async (mode) => {
    try {
        const URL_LOCAL = process.env.mongoUrlLocal;
        const URL_ATLAS = process.env.mongoUrlAtlas;
        const URL = mode === 'local' ? URL_LOCAL : URL_ATLAS;
        await mongoose.connect(URL);
        console.log(`✅ MongoDB conectada correcamente a ${mode === 'local' ? 'Local' : 'Atlas'}`);
    } catch (error) {
        console.error("⚠️ Ocurrio un error al conectar a MongoDb", error);
        process.exit(1);
    }
};
