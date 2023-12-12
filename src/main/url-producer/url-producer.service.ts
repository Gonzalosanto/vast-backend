import { Injectable, OnModuleInit } from '@nestjs/common';
import { MacrosService } from 'src/api/macros/macros.service';
import { urlsToRequest } from 'src/utils';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class UrlProducerService implements OnModuleInit {
    constructor(private macrosService: MacrosService,
        private producerService: ProducerService){}
    
    onModuleInit() {
        this.produceURLs()
    }
    async createURLs(){
        const macrosByAID = await this.macrosService.getMacros();
        const urls = await Promise.all(macrosByAID.map(async (macros) => {
            return Promise.all(macros.map(async (macro: any)=>{
                const url = urlsToRequest(await macro)
                return (await url)
            }))
        }))
        return urls.flat(2); 
    }
    async formatURLsToMessages(): Promise<string[] | object[]>{
        return (await this.createURLs()).map((url:string)=> {
            return {
                "key" : "url",
                "areResultsLogged": false, //FLAG TO LOG CHAIN RESULTS... (false default)
                "value" : url }
        });
    } 
    async produceURLs(){
        const messages = await this.formatURLsToMessages()
        return messages.map((m: string | object) => (
            this.producerService.topicProducer('requests-topic', [m])
        ))
    }
}
