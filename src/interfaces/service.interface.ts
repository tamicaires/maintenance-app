export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employees: [
    {
      name: string;
      jobTitle: string;
    }
  ];
  createdAt?: string;
}
