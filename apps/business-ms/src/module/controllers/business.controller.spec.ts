import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { BusinessService } from '../services/business.service';
import { BusinessController } from './business.controller';

type BusinessServiceMock = Partial<Record<keyof BusinessService, jest.Mock>>;

const businessServiceMock = (): BusinessServiceMock => ({
  getUsers: jest.fn(),
});

describe('BusinessController', () => {
  let controller: BusinessController;
  let businessServiceMocked: BusinessServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        {
          provide: BusinessService,
          useValue: businessServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
    businessServiceMocked = module.get(BusinessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsersList', () => {
    it('should return a list of users', async () => {
      const data = {
        page: 1,
        limit: 5,
        search: null,
      };
      const db = [
        {
          _id: 1,
          mail: 'fh.tallarico@gmail.com',
        },
        {
          _id: 2,
          mail: 'fh.tallarico@conexa.com',
        },
        {
          _id: 3,
          mail: 'conexa@gmail.com',
        },
        {
          _id: 4,
          mail: 'conexa@conexa.com',
        },
        {
          _id: 5,
          mail: 'google@gmail.com',
        },
      ];
      businessServiceMocked.getUsers.mockReturnValue(db);
      const response = await controller.getUsersList(data);
      expect(response).toEqual(db);
    });

    it('should return a filtered list of users', async () => {
      const data = {
        page: 1,
        limit: 5,
        search: 'gmail',
      };
      businessServiceMocked.getUsers.mockReturnValue([
        {
          _id: 1,
          mail: 'fh.tallarico@gmail.com',
        },
        {
          _id: 3,
          mail: 'conexa@gmail.com',
        },
        {
          _id: 5,
          mail: 'google@gmail.com',
        },
      ]);
      const response = await controller.getUsersList(data);
      expect(response).toEqual([
        {
          _id: 1,
          mail: 'fh.tallarico@gmail.com',
        },
        {
          _id: 3,
          mail: 'conexa@gmail.com',
        },
        {
          _id: 5,
          mail: 'google@gmail.com',
        },
      ]);
    });
  });
});
