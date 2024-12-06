export type EmployeeServiceAssigmentType = {
  id: string;
  serviceAssigmentId: string;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
}

export type EmployeeServiceAssigmentCreateType = {
  serviceAssigmentId: string;
  employeeId: string;
}
