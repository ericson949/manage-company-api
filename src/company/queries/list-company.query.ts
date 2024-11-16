import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../entities/company.entity";
import { Repository } from "typeorm";
import { ListCompanyResponse } from "./list-company.response";

export class GetCompaniesQueryHandler{
    constructor(
        @InjectRepository(Company)
        private companiesRepository: Repository<Company>,
    ){}

    async execute():Promise<ListCompanyResponse>{
        const data = await this.companiesRepository.find();
        return {
            status:true,
            companies:data.map((company)=>{
                return{
                    id:company.id,
                    name:company.name,
                    city:company.city??"",
                    fileUrl:company.file??"",
                }
            })
        }
    }
}
