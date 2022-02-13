import {
  Body,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Put,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { UsersService } from 'src/users/shared/users.service';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ReadProfileDto, UpdateProfileDto } from '../dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async profile(@Req() req: Request): Promise<ReadProfileDto> {
    const { id } = <any>req.user;
    const user = await this.service.findOne(id)
    return plainToClass(ReadProfileDto, user);
  }

  @Put()
  async update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateProfileDto,
  ): Promise<ReadProfileDto> {
    const { id } = <any>req.user;
    const user = await this.service.update(id, updateUserDto);
    return plainToClass(ReadProfileDto, user);
  }

  @Patch()
  async disableOrEnable(@Req() req: Request) {
    const { id } = <any>req.user;
    const user = await this.service.disableOrEnable(id);
    return plainToClass(ReadProfileDto, user);
  }
}
