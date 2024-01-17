import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
    clientId: "order-service-broker",
    brokers: ["localhost:9092"]
})

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId: "order-service-group" });

