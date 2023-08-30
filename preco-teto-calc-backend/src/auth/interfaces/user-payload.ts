export interface IUserPayload {
  sub: number | string;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}
