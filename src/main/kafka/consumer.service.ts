import { Injectable } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
@Injectable()
export class ConsumerService {
    private kafkaClient = new Kafka({
        clientId: 'main-client',
        brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`]
    })    
    private consumer : Consumer = this.kafkaClient.consumer({ groupId: 'main-group'})
    static instance: null | ConsumerService = null;
    private _isConnected = false;
    constructor(){}

    async handleReportsSubscription(reportHandler: any) {
        try {
            const instance = await ConsumerService.getInstance();
            await instance.consumer.connect()
            await instance.consumer.subscribe({ topics: [process.env.KAFKA_TOPIC_REPORTS], fromBeginning: true })
            await instance.consumer.run({
                eachMessage: async ({message, heartbeat}) => {
                    await heartbeat()
                    reportHandler(message.value.toString())
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async getInstance() {
        if (!this.instance || !this.instance._isConnected) {
            return (this.instance = new ConsumerService());
        }
        return this.instance;
    }

    async start() {
        try {
            await this.consumer.connect();
            this._isConnected = true;
        } catch (error) {
            console.log(error)
        }
    }

    async shutdown() {
        await this.consumer.disconnect()
        ConsumerService.instance._isConnected = false;
    }
}
