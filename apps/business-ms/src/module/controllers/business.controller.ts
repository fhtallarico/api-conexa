import { Controller, HttpException, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { BusinessService } from '../services/business.service';

@Controller()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @MessagePattern({ cmd: 'get_users_list' })
  async getUsersList(data: any) {
    console.log('entro');
    const response = await this.businessService.getUsers(
      data.page,
      data.list,
      data.search,
    );
    return response;
  }
}
