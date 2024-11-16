import { Company } from "../entities/company.entity";

export interface ListCompanyResponse {
    companies:Partial<Company>[],
    status:boolean
}