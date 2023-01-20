import { config } from "dotenv";
import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongo } from "./config/db";

const createServer = async () => {
    config()
    await connectToMongo()
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`))

    process.on('SIGINT', async () => {
        await connection.close()
        server.close()
        console.log('App server and mongoDB connection closed.')
    })
}

createServer()