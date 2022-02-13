import { PartialType } from '@nestjs/swagger';
import { UserResponse } from 'src/users/dto';

export class ProfileResponseDto extends PartialType(UserResponse) {}
