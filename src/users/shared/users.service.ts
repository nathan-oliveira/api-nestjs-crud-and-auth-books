import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from 'src/users/model/users.model';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { userAlreadyRegistered } from 'src/expection-filters/error-customs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repository: Repository<Users>,
  ) {}

  convertToHash(password: string): Promise<string> {
    return bcrypt.hash(password, 15);
  }

  async findAll(): Promise<Users[]> {
    return await this.repository.find();
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.repository.findOne({ email });
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async create(createUserDTO: CreateUserDto): Promise<Users> {
    const existUser = await this.findByEmail(createUserDTO.email);
    if (existUser) userAlreadyRegistered();

    const user = this.repository.create(createUserDTO);
    user.password = await this.convertToHash(user.password);
    return this.repository.save(user);
  }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<Users> {
    const user = await this.repository.preload({
      id: +id,
      ...updateUserDTO,
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (updateUserDTO.password)
      user.password = await this.convertToHash(user.password);
    return this.repository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.repository.remove(user);
  }

  async disableOrEnable(id: string) {
    const user = await this.findOne(id);
    user.active = !user.active;
    return this.repository.save(user);
  }
}
