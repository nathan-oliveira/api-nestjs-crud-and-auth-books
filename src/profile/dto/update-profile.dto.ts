import { PartialType } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto';

export class UpdateProfileDto extends PartialType(UpdateUserDto) {}
