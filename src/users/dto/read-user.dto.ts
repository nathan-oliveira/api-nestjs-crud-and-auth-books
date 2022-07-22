import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Users } from '../model/users.model';

export class ReadUserDto extends OmitType(Users, [
  'password',
  'created_at',
  'updated_at',
]) {
  @Exclude()
  password?: string;

  @Exclude()
  created_at?: Date;

  @Exclude()
  updated_at?: Date;
}
