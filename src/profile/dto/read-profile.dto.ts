import { PartialType } from '@nestjs/mapped-types';
import { ReadUserDto } from 'src/users/dto';

export class ReadProfileDto extends PartialType(ReadUserDto) {}
