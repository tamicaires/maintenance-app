import { BaseService } from "@/core/api/base-service"
import { ICompany } from "@/shared/types/company.interface"

/**
 * Service for managing service assignments
 */
class CompanyService extends BaseService<ICompany> {
  constructor() {
    super("/companies")
  }

}

export const companyService = new CompanyService
