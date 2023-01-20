import { config } from 'dotenv'
import { connect } from 'mongoose'
config()

export const connectToMongo = async () => {
    await connect(process.env.MONGODB_CONNECTION_URL!)
}