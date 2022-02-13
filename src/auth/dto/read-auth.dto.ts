import { PartialType } from '@nestjs/swagger';
import { ReadUserDto } from 'src/users/dto';

export class ReadAuthDto extends PartialType(ReadUserDto) {}
