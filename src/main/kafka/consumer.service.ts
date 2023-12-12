import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
@Injectable()
export class ConsumerService implements OnModuleInit {
    private instance: ConsumerService;
    private _isConnected = false;
    private kafkaClient: any = new Kafka({
        clientId: 'main-client',
        brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`]
    })
    private consumer: any = this.kafkaClient.consumer({ groupId: 'main-group' });

    async onModuleInit() {
        try {
            //await this.handleReportsSubscription()
        } catch (error) {
            console.log('Could not establish any connection')
        }

    }

    public getInstance(): ConsumerService {
        if (!this.instance._isConnected) {
            return new ConsumerService();
        }
        return this.instance;
    }

    async handleReportsSubscription() {
        this.start()
        await this.consumer.subscribe({ topics: [process.env.KAFKA_TOPIC_REPORTS], fromBeginning: true })
        try {
            await this.consumer.run({
                eachMessage: async ({
                    topic, partition, message, heartbeat, pause
                }) => {
                    return message;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async start() {
        try {
            await this.consumer.connect()
            this._isConnected = true;
        } catch (error) {
            console.log(error)
        }
    }

    async shutdown() {
        await this.consumer.disconnect()
        this._isConnected = false;
    }
}
