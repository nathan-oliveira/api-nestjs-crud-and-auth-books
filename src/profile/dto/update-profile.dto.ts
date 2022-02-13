import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from 'src/users/dto';

export class UpdateProfileDto extends PartialType(UpdateUserDto) {}
