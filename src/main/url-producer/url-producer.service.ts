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
        try {
            this.produceURLs()
        } catch (error) {
            console.log(error)
        }
    }
    async createURLs(){
        const checkMacros = (object: any) => {
            const valuesToCheck = Object.values(object);
            return valuesToCheck.some(v => {return v == undefined || v == null});
        }
        const macrosByAID = await this.macrosService.getMacros();
        const urls = macrosByAID.map(async (macros) => {
            if(checkMacros(macros)){
                return;
            } else {
                const url = urlsToRequest(await macros)
                return (await url)
            }
        })
        return Promise.all(urls);
    }
    async formatURLsToMessages(): Promise<object[]> {
        return (await this.createURLs()).map((url: string)=> {
            return {
                "key" : "url",
                "areResultsLogged": false, //FLAG TO LOG CHAIN RESULTS... (false default)
                "value" : url }
        });
    } 
    async produceURLs(){
        const messages = await this.formatURLsToMessages()
        console.log(messages)
        return messages.forEach((m: any) => {
            m.value ? console.log([m]) : console.log('undefined message')
            //this.producerService.topicProducer(process.env.KAFKA_TEST_TOPIC, [m])
        }) 
    }
}
