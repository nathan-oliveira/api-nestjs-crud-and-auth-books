import * as env from 'dotenv'
env.config()

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, createConnection } from 'typeorm';

import { ProfileController } from 'src/profile/shared/profile.controller';
import { UsersService } from 'src/users/shared/users.service';
import { Users } from 'src/users/model/users.model';


describe('ProfileController', () => {
  let controller: ProfileController;
  let service: UsersService;

  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: false,
      entities: [`${__dirname}/**/*.model{.ts,.js}`],
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    const mockService = {
      profile: jest.fn(),
      update: jest.fn(),
      disableAccount: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileController,
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockService,
        }
      ]
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<UsersService>(UsersService);
  });

  it('controller is defined', () => {
    expect(controller).toBeDefined();
  });
});
