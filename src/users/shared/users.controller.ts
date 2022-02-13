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
import { UsersService } from './users.service';
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.service.create(createUserDto);
    return plainToClass(ReadUserDto, user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ReadUserDto[]> {
    const users = await this.service.findAll();
    return plainToClass(ReadUserDto, users);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ReadUserDto> {
    const user = await this.service.findOne(id);
    return plainToClass(ReadUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const user = await this.service.update(id, updateUserDto);
    return plainToClass(ReadUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReadUserDto> {
    const user = await this.service.remove(id);
    return plainToClass(ReadUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async disableOrEnable(@Param('id') id: string) {
    const user = await this.service.disableOrEnable(id);
    return plainToClass(ReadUserDto, user);
  }
}
