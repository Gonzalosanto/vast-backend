import { HttpException, HttpStatus, Controller, Get, Post, Put, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MacrosService } from './macros.service';
import Papa from 'papaparse';

@Controller('bundles')
export class MacrosController {
    constructor(private macrosService: MacrosService){}

    @Get()
    getAllMacros(){
        return this.macrosService.getMacros();
    }

    @Post('load-bundles')
    @UseInterceptors(FileInterceptor('file'))
    async createFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        const fileDataAsJSON = Papa.parse((file.buffer).toString());
        if(fileDataAsJSON.errors.length > 0) {throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);}
        return this.macrosService.createFromFileData(fileDataAsJSON);
    }

    @Post('load-devices')
    @UseInterceptors(FileInterceptor('file'))
    async createDevicesFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        const fileDataAsJSON = Papa.parse((file.buffer).toString());
        if(fileDataAsJSON.errors.length > 0) {throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);}
        return this.macrosService.createDevicesFromFileData(fileDataAsJSON);
    }
    @Post()
    async createFromFormData(@Body() data: any): Promise<any>{
        return this.macrosService.createFromFormData(data)
    }

}