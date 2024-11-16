import { Inject, Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { CreateCompanyController } from "./controller/company.controller";
import { CreateCompanyHandler } from "./commands/create-company.handler";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { FileUploadService } from "../core/commons/services/file-upload.service";
import { GetCompaniesQueryHandler } from "./queries/list-company.query";

@Module({
    imports: [
      MulterModule.register({
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),
      TypeOrmModule.forFeature([Company]),
      UsersModule
    ],
    controllers:[
        CreateCompanyController
    ],
    providers:[
      CreateCompanyHandler,
      GetCompaniesQueryHandler,
      FileUploadService
    ]
})
export class CompanyModule{}