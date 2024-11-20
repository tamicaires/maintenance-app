export interface IPartCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPartCategoryCreateAndUpdate {
  name: string;
  description: string;
}