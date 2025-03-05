export interface IEmployee {
  id: string;
  name: string;
  workShift: string;
  jobTitleId: string;
  jobTitle: string;
  isActive: boolean;
  createdAt?: string;
}

export interface EmployeeBasicInfo {
  id: string;
  name: string;
  jobTitle: string;
}

export interface IEmployeeCreateAndUpdate {
  name: string;
  workShift: string;
  jobTitleId: string;
  isActive: boolean;
}

export interface IEmployeeWithCount {
  employees: IEmployee[];
  totalCount: number;
}
