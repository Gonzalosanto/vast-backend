import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';


@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'KAFKA',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'main-client',
              brokers: [`${process.env.KAFKA_SERVER}:${process.env.KAFKA_PORT}`],
            },
            consumer: {
              groupId: 'main-consumer'
            }
          }
        },
      ]),
    ],
    providers:[ConsumerService, ProducerService],
    exports: [ConsumerService, ProducerService]
  })

  export class KafkaModule {}