import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReportsService } from 'src/api/reports/reports.service';
import { Kafka } from 'kafkajs';
@Injectable()
export class ConsumerService {
    static instance: ConsumerService;
    private _isConnected = false;
    private kafkaClient: any = new Kafka({
        clientId: 'main-client',
        brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`]
    })
    private consumer: any = this.kafkaClient.consumer({ groupId: 'main-group' });

    static async getInstance() {
        if (!ConsumerService.instance || !ConsumerService.instance._isConnected) {
            return ConsumerService.instance = new ConsumerService();
        }
        return ConsumerService.instance;
    }

    async handleReportsSubscription(reportHandler: any) {
        const instance = await ConsumerService.getInstance()
        await instance.consumer.subscribe({ topics: [process.env.KAFKA_TOPIC_REPORTS], fromBeginning: true })
        try {
            console.log(`Consumer listening topic: ${process.env.KAFKA_TOPIC_REPORTS}`);
            await instance.consumer.run({
                eachMessage: async ({
                    topic, partition, message, heartbeat, pause
                }) => {
                    await heartbeat();
                    await reportHandler(message.value.toString());
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async start() {
        try {
            await ConsumerService.instance.consumer.connect();
            ConsumerService.instance._isConnected = true;
        } catch (error) {
            console.log(error)
        }
    }

    async shutdown() {
        await ConsumerService.instance.consumer.disconnect()
        ConsumerService.instance._isConnected = false;
    }
}
