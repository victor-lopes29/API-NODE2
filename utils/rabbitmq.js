
const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    if (!channel) {
        const connection = await amqp.connect('amqp://localhost'); 
        channel = await connection.createChannel();
        console.log('✅ Conectado ao RabbitMQ');
    }
    return channel;
};

const sendToQueue = async (queue, message) => {
    if (!channel) {
        await connectRabbitMQ();
    }

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

    console.log(`📩 Mensagem enviada para a fila ${queue}:`, message);
};

module.exports = { connectRabbitMQ, sendToQueue };
