import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'nome de usuário'
  })
  @IsString()
  @Length(6, 255, { message: 'Nome deve conter no mínimo 6 á 255 caracteres!' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'e-mail de usuário'
  })
  @IsEmail({}, { message: 'E-mail inválido!' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'senha de usuário'
  })
  @IsString()
  @Length(6, 220, { message: 'Senha deve conter no mínimo 6 á 200 caracteres!' })
  password: string;
}
