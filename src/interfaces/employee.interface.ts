export interface IEmployee {
  id: string;
  name: string;
  workShift: string;
  jobTitleId: string;
  jobTitle: string;
  status?: string;
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
  status: "ATIVO" | "INATIVO";
}
