import { Controller, HttpException, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { User } from 'apps/login-ms/src/module/schemas/user.schema';
import { GetUsersListBodyDto } from '../dtos/get-users-list.dto';
import { BusinessService } from '../services/business.service';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @EventPattern('get_users_list')
  async getUsersList(data: GetUsersListBodyDto): Promise<User[]> {
    try {
      const response = await this.businessService.getUsers(data);
      return response;
    } catch (error) {
      Logger.error(
        BusinessController.name +
          ' | ' +
          this.getUsersList.name +
          ' | ' +
          error.message,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
