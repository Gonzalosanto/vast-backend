import { HttpException, HttpCode, HttpStatus, Controller, Get, Post, Put, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MacrosService } from './macros.service';
import Papa from 'papaparse';

@Controller('macros')
export class MacrosController {
    constructor(private macrosService: MacrosService){}

    @Get()
    async getAllMacros(){
        return this.macrosService.getMacros();
    }

    @Post('load-bundles')
    @UseInterceptors(FileInterceptor('file'))
    async createFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        const fileDataAsJSON = Papa.parse((file.buffer).toString());
        if(fileDataAsJSON.errors.length > 0) {throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);}
        this.macrosService.createFromFileData(fileDataAsJSON)
        return "Processing filedata of bundles...";
    }

    @Post('load-devices')
    @UseInterceptors(FileInterceptor('file'))
    async createDevicesFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        const fileDataAsJSON = Papa.parse((file.buffer).toString());
        if(fileDataAsJSON.errors.length > 0) {throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);}
        this.macrosService.createDevicesFromFileData(fileDataAsJSON);
        return "Processing filedata of devices  ...";
    }
    @Post()
    async createFromFormData(@Body() data: any): Promise<any>{
        return this.macrosService.createFromFormData(data)
    }

}