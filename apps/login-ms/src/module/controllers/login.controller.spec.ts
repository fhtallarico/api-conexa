import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../services/login.service';
import { LoginController } from './login.controller';
import { when } from 'jest-when';

type LoginServiceMock = Partial<Record<keyof LoginService, jest.Mock>>;

const loginServiceMock = (): LoginServiceMock => ({
  createUser: jest.fn(),
  loginUser: jest.fn(),
  getUserList: jest.fn(),
});

describe('LoginController', () => {
  let controller: LoginController;
  let loginServiceMocked: LoginServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: loginServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginServiceMocked = module.get(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create an user', async () => {
      const body = {
        mail: 'fh.tallarico@gmail.com',
        password: '123456',
      };
      when(loginServiceMocked.createUser)
        .calledWith(body)
        .mockReturnValue(body);

      const response = await controller.createUser(body);
      expect(response).toEqual({
        data: body,
        errorMessage: '',
        statusCode: 201,
      });
    });
  });

  describe('loginUser', () => {
    it('should login an user and return a token', async () => {
      const body = {
        mail: 'fh.tallarico@gmail.com',
        password: '123456',
      };
      when(loginServiceMocked.createUser)
        .calledWith(body)
        .mockReturnValue('token example');

      const response = await controller.createUser(body);
      expect(response).toEqual({
        data: 'token example',
        errorMessage: '',
        statusCode: 201,
      });
    });
  });
});
