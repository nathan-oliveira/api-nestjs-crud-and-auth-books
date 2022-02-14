import {
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, ReadUserDto, UpdateUserDto, UserResponse } from '../dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/shared/roles/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/shared/roles/roles.decorator';

@Roles(Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOkResponse({ type: UserResponse })
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.service.create(createUserDto);
    return plainToClass(ReadUserDto, user);
  }
  
  @Get()
  @ApiOkResponse({ type: [UserResponse] })
  async getAll(): Promise<ReadUserDto[]> {
    const users = await this.service.findAll();
    return plainToClass(ReadUserDto, users);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponse })
  async getById(@Param('id') id: string): Promise<ReadUserDto> {
    const user = await this.service.findOne(id);
    return plainToClass(ReadUserDto, user);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserResponse })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const user = await this.service.update(id, updateUserDto);
    return plainToClass(ReadUserDto, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponse })
  async disableOrEnable(@Param('id') id: string) {
    const user = await this.service.disableOrEnable(id);
    return plainToClass(ReadUserDto, user);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.service.remove(id);
  }
}
