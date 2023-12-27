import { Injectable, OnModuleInit } from '@nestjs/common';
import { MacrosService } from 'src/api/macros/macros.service';
import { urlsToRequest } from 'src/utils';
import { ProducerService } from '../kafka/producer.service';
import 'dotenv/config';

@Injectable()
export class UrlProducerService implements OnModuleInit {
    constructor(private macrosService: MacrosService,
        private producerService: ProducerService){}
    
    onModuleInit() {
        setInterval(()=>{
            this.produceURLs()
        },250)
    }
    async createURLs(){
        const macrosByAID = await this.macrosService.getMacros();
        const urls = macrosByAID.map(async (macros) => {
            const url = urlsToRequest(await macros)
            return (await url)            
        })
        return Promise.all(urls);
    }
    async formatURLsToMessages(): Promise<string[] | object[]>{
        return (await this.createURLs()).map((url: any)=> {
            return {
                "key" : "url",
                "areResultsLogged": false, //FLAG TO LOG CHAIN RESULTS... (false default)
                "value" : url }
        });
    } 
    async produceURLs(){
        const messages = await this.formatURLsToMessages()
        return messages.map((m: any) => {
            this.producerService.topicProducer(process.env.KAFKA_TEST_TOPIC, [m])
        }) 
    }
}
