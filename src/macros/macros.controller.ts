import { HttpException, HttpStatus, Controller, Get, Post, Put, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MacrosService } from './macros.service';
import { CreateMacroDto } from './dto/create-macro.dto';
import Papa from 'papaparse';

@Controller('bundles')
export class MacrosController {
    constructor(private macrosService: MacrosService){}

    @Get()
    getAllMacros(){
        return this.macrosService.getMacros();
    }

    @Post('upload-new-macros-file')
    @UseInterceptors(FileInterceptor('csvfile'))
    async createFromFile(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new HttpException('File not found', HttpStatus.CONFLICT);
        const fileDataAsJSON = Papa.parse((file.buffer).toString());
        if(fileDataAsJSON.errors.length > 0) {throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);}
        return this.macrosService.createFromFileData(fileDataAsJSON);
    }
    @Post('create-new-macro')
    async createFromFormData(@Body() data: CreateMacroDto): Promise<any>{
        return this.macrosService.createFromFormData(data)
    }

}