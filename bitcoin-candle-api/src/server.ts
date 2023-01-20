import { config } from "dotenv";
import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongo } from "./config/db";
import CandleMessageChannel from "./messages/CandleMessageChannel";

const createServer = async () => {
    config()
    await connectToMongo()
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`))

    const candleMsgChannel = new CandleMessageChannel(server)
    candleMsgChannel.consumeMessages()

    process.on('SIGINT', async () => {
        await connection.close()
        server.close()
        console.log('App server and mongoDB connection closed.')
    })
}

createServer()