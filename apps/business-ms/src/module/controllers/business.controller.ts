import { Controller, HttpException, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BusinessService } from '../services/business.service';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @EventPattern('get_users_list')
  async getUsersList(data: any) {
    try {
      const response = await this.businessService.getUsers(
        data.page,
        data.list,
        data.search,
      );
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
