const env = process.env.NODE_ENV || 'development';
import { HttpException, HttpCode, HttpStatus, Controller, Get, Post, Put, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MacrosService } from './macros.service';
import 'fs'

const multerOptions = {
    dest: './public/uploads/',
    limits: { fileSize: 1024 * 1000 * 10} // 10 Megabytes limit
}
@Controller('macros')
export class MacrosController {
    constructor(private macrosService: MacrosService){}

    @Get()
    async getAllMacros(){
        return this.macrosService.getMacros();
    }

    @Post('load-bundles')
    @HttpCode(202)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async createFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        await this.macrosService.readDeviceData(file, "bundles");
        return;
    }

    @Post('load-devices')
    @HttpCode(202)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async createDevicesFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        await this.macrosService.readDeviceData(file, "devices");
        return;
    }
    @Post()
    async createFromFormData(@Body() data: any): Promise<any>{
        return this.macrosService.createFromFormData(data)
    }

}