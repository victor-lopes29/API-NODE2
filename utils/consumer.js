const { connectRabbitMQ } = require('./rabbitmq');

let channel;

const consumeFromQueue = async (queue) => {
    if (!channel) {
        console.error('❌ Canal RabbitMQ não inicializado.');
        return;
    }

    await channel.assertQueue(queue, { durable: true });

    console.log(`📥 Aguardando mensagens na fila: ${queue}`);
    channel.consume(queue, (msg) => {
        if (msg) {
            const content = msg.content.toString();
            console.log(`📨 Mensagem recebida: ${content}`);
            channel.ack(msg); // Confirma recebimento da mensagem
        }
    });
};

const startConsumer = async () => {
    channel = await connectRabbitMQ(); // Garante conexão com RabbitMQ
    await consumeFromQueue("fila_get_animal"); // Substitua pelo nome correto da fila
};

startConsumer();
