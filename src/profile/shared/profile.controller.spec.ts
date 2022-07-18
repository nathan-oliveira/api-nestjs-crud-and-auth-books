import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProfileController } from 'src/profile/shared/profile.controller';
import { UsersService } from 'src/users/shared/users.service';
import { Users } from 'src/users/model/users.model';

describe('ProfileController', () => {
  let controller: ProfileController;

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
  });

  it('controller is defined', () => {
    expect(controller).toBeDefined();
  });
});
