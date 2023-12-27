import { Injectable } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
@Injectable()
export class ProducerService {
  static instance: ProducerService = null;
  private _isConnected = false;
  private kafkaClient: Kafka;
  private producer: Producer;

  constructor() {
    try {
      this.kafkaClient = new Kafka({
        clientId: 'main-client-producer',
        brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`],
      });
    } catch (error) {
      console.error('Error initializing Kafka client: ', error);
    }
    this.producer = this.kafkaClient.producer();
  }

  async topicProducer(topic: string, messages: Message[]) {
    try {
      const currentProducerInstance = ProducerService.getInstance();
      await currentProducerInstance.start();
      await currentProducerInstance.producer.send({ topic: topic, messages: messages});
    } catch (error) {
      console.error(error);
    }
  }

  static getInstance(): ProducerService {
    if (!this.instance || !this.instance._isConnected) {
      return (this.instance = new ProducerService());
    }
    return this.instance;
  }

  async start() {
    try {
      await this.producer.connect();
      this._isConnected = true;
    } catch (error) {
      console.error('Error connecting producer to broker: ', error);
    }
  }

  async shutdown() {
    await this.producer.disconnect();
    ProducerService.instance = null;
    this._isConnected = false;
  }
}