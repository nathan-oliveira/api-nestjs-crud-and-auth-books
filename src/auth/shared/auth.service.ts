import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/shared/users.service';
import { ValidateUserDTO, CreateAuthDto, LoginUserDTO } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserDTO | boolean> {
    const user = await this.usersService.findByEmail(email);
    const passwordValid = await this.compareHash(password, user.password);

    if (user && passwordValid && user.active) {
      const { id, name, email, active, level } = user;
      return { id, name, email, active, level };
    }

    return false;
  }

  async userIsDisabled(email: string): Promise<void | boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user.active) return true;
  }

  async login({ email, id, active, level }: LoginUserDTO): Promise<object> {
    const payload = { email: email, sub: id, active, level };
    return { access_token: this.jwtService.sign(payload) };
  }

  async create(createAuthDto: CreateAuthDto): Promise<CreateAuthDto> {
    const user: any = { ...createAuthDto, level: 1 };
    return this.usersService.create(user);
  }
}
