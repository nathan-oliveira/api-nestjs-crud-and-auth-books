import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { CreateAuthDto, ReadAuthDto } from '../dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<ReadAuthDto> {
    const user = await this.authService.create(createAuthDto);
    return plainToClass(ReadAuthDto, user);
  }
}
