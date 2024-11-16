import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadService } from '../../core/commons/services/file-upload.service';
import { CreateCompanyHandler } from '../commands/create-company.handler';
import { CreateCompanyResponse } from '../commands/create-company.response';
import { GetCompaniesQueryHandler } from '../queries/list-company.query';
import { ListCompanyResponse } from '../queries/list-company.response';

@Controller('/company')
export class CreateCompanyController {
  constructor(
    private readonly createCompanyHandler: CreateCompanyHandler,
    private readonly getCompaniesQueryHandler: GetCompaniesQueryHandler,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create company',
    type: CreateCompanyDto,
  })
  create(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateCompanyResponse> {
    const response = this.fileUploadService.handleFileUpload(file);
    
    return this.createCompanyHandler.execute({
      ...createCompanyDto,
      file: response.filePath,
    });
  }

  @UseGuards(AuthGuard)
  @Get('list')
  @ApiBody({
    description: 'list company',
    type: Array<CreateCompanyDto>,
  })
  list(): Promise<ListCompanyResponse> {    
    return this.getCompaniesQueryHandler.execute();
  }
}
