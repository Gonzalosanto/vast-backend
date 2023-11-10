import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
@Injectable()
export class ProducerService implements OnModuleInit {
    private instance: ProducerService;
    private _isConnected = false;
    private kafkaClient: any = new Kafka({
        clientId: 'main-client-producer',
        brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`]
    })
    private producer: any = this.kafkaClient.producer();
    async onModuleInit() {
    }

    async topicProducer(topic: string, messages: Array<string>) {
        //Sends to specified topic a messages list...
        try {
            await this.start();
            await this.producer.send({ topic: topic, messages: messages });
        } catch (error) {
            console.error(error)
        }
    }

    public getInstance(): ProducerService {
        if (!this.instance._isConnected) {
            return new ProducerService()
        }
        return this.instance;
    }

    async start() {
        try {
            await this.producer.connect()
            this._isConnected = true;
        } catch (error) {
            console.error('Error connecting producer to broker: ', error);
        }
    }

    async shutdown() {
        await this.producer.disconnect()
        this._isConnected = false;
    }


}
