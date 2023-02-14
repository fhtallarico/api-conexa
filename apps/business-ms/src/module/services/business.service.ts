import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
} from 'apps/login-ms/src/module/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(page: number, limit: number, search: string): Promise<User[]> {
    const searchOptions = search
      ? { mail: { $regex: search, $options: 'i' } }
      : {};
    const users = await this.userModel
      .find(searchOptions, 'mail')
      .limit(limit)
      .skip(limit * page);
    console.log(users);
    return users;
  }
}
