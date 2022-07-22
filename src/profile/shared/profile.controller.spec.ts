import * as env from 'dotenv';
env.config();

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ProfileController } from 'src/profile/shared/profile.controller';
import { UsersService } from 'src/users/shared/users.service';
import { Users } from 'src/users/model/users.model';
import { ReadProfileDto } from '../dto';

export const mockResponse = (): any => ({
  setHeader: jest.fn(),
  user: {
    id: '1',
  },
});

export const mockProfileFindOneReturn = (): ReadProfileDto => ({
  id: 1,
  name: 'Nathan Oliveira',
  email: 'teste17@hotmail.com',
  active: true,
  level: 1,
});

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: UsersService;

  beforeEach(async () => {
    const mockService = {
      profile: jest.fn(),
      update: jest.fn(),
      disableAccount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileController,
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<UsersService>(UsersService);
  });

  it('controller is defined', () => {
    expect(controller).toBeDefined();
  });

  describe('profile()', () => {
    it('checking to return the parameters in the right order', async () => {
      const findSpy = jest.spyOn(service, 'findOne').mockReturnThis();
      const response = mockResponse();
      await controller.profile(response);

      expect(findSpy).toHaveBeenCalledWith(response.user.id);
    });

    it('checking to return parameters in the wrong order', async () => {
      const findSpy = jest.spyOn(service, 'findOne').mockReturnThis();
      const response = mockResponse();
      await controller.profile(response);

      expect(findSpy).not.toHaveBeenCalledWith(null);
    });

    it('principle the method and returning errors', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      const response = mockResponse();

      await expect(controller.profile(response)).rejects.toThrow(new Error());
    });

    it('calling the method and returning the data successfully', async () => {
      const mockReturn = mockProfileFindOneReturn() as Users;

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockReturn);

      const response = mockResponse();

      expect(await controller.profile(response)).toEqual(mockReturn);
    });
  });
});
