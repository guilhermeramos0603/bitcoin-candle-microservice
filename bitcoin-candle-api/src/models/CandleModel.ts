import { model, Document, Schema } from 'mongoose'

export interface Candle extends Document {
    low: number
    high: number
    open: number
    close: number
    color: string
    initialDateTime: Date
    finalDateTime: Date
    currency: string
}

const schema = new Schema<Candle>({
    low: { type: Number, required: true },
    high: { type: Number, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    color: { type: String, required: true },
    initialDateTime: { type: Date, required: true },
    finalDateTime: { type: Date, required: true },
    currency: { type: String, required: true }
})

export const CandleModel = model<Candle>('Candle', schema)