"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageChannel = void 0;
const dotenv_1 = require("dotenv");
const amqplib_1 = require("amqplib");
const createMessageChannel = async () => {
    (0, dotenv_1.config)();
    try {
        const connection = await (0, amqplib_1.connect)(process.env.AMQP_SERVER);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME);
        console.log('Connected to RabbitMQ');
        return channel;
    }
    catch (err) {
        console.error('Error while trying to connect to RabbitMQ: ', err);
        return null;
    }
};
exports.createMessageChannel = createMessageChannel;
