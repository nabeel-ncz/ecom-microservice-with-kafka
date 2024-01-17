import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
    clientId: "user-service-kafka",
    brokers: ["localhost:9092"]
})

const producer: Producer = kafka.producer();
const consumer: Consumer = kafka.consumer({ groupId: "test-user-group" });


export const produceEvent = async (topic: string, messages: any) => {
    try {
        await producer.connect();
        await producer.send({
            topic,
            messages
        })
    } catch (error: any) {
        console.error('kafka produce error : ', error?.message);
    } finally {
        await producer.disconnect();
    }
}

export const consumeEvent = async (topic: string, callback: (value: any) => void) => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value?.toString();
                callback(value);
            }
        })
    } catch (error: any){
        console.error('kafka consume error : ', error?.message);
    }
}