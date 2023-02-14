import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginBodyDto, TokenDto } from '../dtos/login.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject('BUSINESS_SERVICE') private readonly businessClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async createUser(userBody: LoginBodyDto): Promise<User> {
    const { mail, password } = userBody;

    const hashedPassword = await hash(password, 10);

    return this.userModel.create({
      mail,
      password: hashedPassword,
    });
  }

  async loginUser(userBody: LoginBodyDto): Promise<TokenDto> {
    try {
      const { mail, password } = userBody;

      const user = await this.userModel.findOne({ mail });

      if (!user)
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

      const checkPassword = await compare(password, user.password);

      if (!checkPassword)
        throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);

      const token = await this.generateToken(user);
      return { token };
    } catch (error) {
      Logger.error(
        LoginService.name +
          ' | ' +
          this.createUser.name +
          ' | ' +
          error.message,
      );
    }
  }

  async generateToken(user): Promise<string> {
    const payload = { id: user._id, mail: user.mail };

    return this.jwtService.sign(payload);
  }

  async getUserList(page, limit, search): Promise<any> {
    const data = {
      page,
      limit,
      search,
    };
    const users = await this.businessClient.emit('get_users_list', data);
    return users;
  }
}
