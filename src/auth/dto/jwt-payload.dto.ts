export interface JwtPayloadDTO {
  iat: number;
  sub: string;
  email: string; 
  active: boolean;
}
