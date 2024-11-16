import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../entities/company.entity";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { CreateCompanyResponse } from "./create-company.response";

export class CreateCompanyHandler{
    constructor(
        @InjectRepository(Company)
        private companiesRepository: Repository<Company>,
    ){}
    async execute(command:CreateCompanyDto):Promise<CreateCompanyResponse>{
        try{
            const company = this.companiesRepository.create(command);
        this.companiesRepository.save(company)   
        return {
            status:true,
            isSaved:true,
            message:"Companie crée avec success"
        }    
        }catch(e){
            return {
                status:false,
                isSaved:false,
                message:"Une erreur est survenue"
            }   
        }
        
    }
}