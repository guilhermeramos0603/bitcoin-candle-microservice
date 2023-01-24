"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const axios_1 = __importDefault(require("axios"));
const Period_1 = __importDefault(require("./enums/Period"));
const Candle_1 = __importDefault(require("./models/Candle"));
const messageChannel_1 = require("./messages/messageChannel");
(0, dotenv_1.config)();
const readMarketPrice = async () => {
    const result = await axios_1.default.get(process.env.PRICES_API);
    const data = result.data;
    const price = data.bitcoin.usd;
    return price;
};
const generateCandles = async () => {
    const messageChannel = await (0, messageChannel_1.createMessageChannel)();
    if (messageChannel) {
        while (true) {
            const loopTime = Period_1.default.ONE_MINUTE / Period_1.default.TEN_SECONDS;
            const candle = new Candle_1.default('BTC', new Date());
            for (let i = 0; i < loopTime; i++) {
                const price = await readMarketPrice();
                candle.addValue(price);
                console.log(`Market Price #${i + 1} of ${loopTime}`);
                await new Promise(r => setTimeout(r, Period_1.default.TEN_SECONDS));
            }
            candle.closeCandle();
            console.log('Close Candle!');
            const candleObj = candle.toSimpleObject();
            console.log(candleObj);
            const candleJson = JSON.stringify(candleObj);
            messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson));
            console.log('Candle enqueued!');
        }
    }
};
generateCandles();
