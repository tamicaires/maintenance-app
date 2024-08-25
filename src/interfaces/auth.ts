export interface IUser {
  name?: string;
  email?: string;
  role?: string;
  access_token?: string;
}

export interface ITokenPayload {
  name?: string;
  email?: string;
  role: string;
  access_token: number;
}
