import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto';

export class CreateAuthDto extends PartialType(OmitType(CreateUserDto, ['level'])) {}
