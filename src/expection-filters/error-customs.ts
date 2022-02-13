import { HttpException, HttpStatus } from "@nestjs/common";

export const errorUnauthorized = () => {
  throw new HttpException('E-mail ou Senha inválido', HttpStatus.UNAUTHORIZED);
}

export const userAlreadyRegistered = () => {
  throw new HttpException('Usuário da possui cadastro', HttpStatus.CONFLICT)
}