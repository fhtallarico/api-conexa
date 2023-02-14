import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
} from '../../../../login-ms/src/module/schemas/user.schema';
import { Model } from 'mongoose';
import { GetUsersListBodyDto } from '../dtos/get-users-list.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(data: GetUsersListBodyDto): Promise<User[]> {
    const searchOptions = data.search
      ? { mail: { $regex: data.search, $options: 'i' } }
      : {};

    const users = await this.userModel
      .find(searchOptions, 'mail')
      .limit(data.limit)
      .skip(data.limit * data.page);

    return users;
  }
}
