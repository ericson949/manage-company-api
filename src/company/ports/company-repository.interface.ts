import { Company } from "../entities/company.entity";
export type I_COMPANY_REPOSITORY ="I_COMPANY_REPOSITORY"
export interface ICompanyRepository{
    create(company: Company): Promise<void>;
}