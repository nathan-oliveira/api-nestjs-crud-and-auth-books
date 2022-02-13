import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/shared/users.service'
import { ValidateUserDTO } from '../dto/validate-user.dto'
import { LoginUserDTO } from '../dto/login-user.dto'
import { CreateAuthDto } from '../dto/create-auth.dto';

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
  ) : Promise<ValidateUserDTO | boolean> {
    const user = await this.usersService.findByEmail(email);
    const passwordValid = await this.compareHash(password, user.password);

    if (user && passwordValid && user.active) {
      const { id, name, email, active } = user;
      return { id, name, email, active };
    }

    return false;
  }

  async userIsDisabled(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user.active) return true; 
  }

  async login({ email, id, active }: LoginUserDTO) {
    const payload = { email: email, sub: id, active };
    
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    const user: any = { ...createAuthDto, level: 1 };
    return this.usersService.create(user);
  }
}
