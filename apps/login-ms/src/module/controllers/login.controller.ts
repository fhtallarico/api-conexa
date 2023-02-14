import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../../../../commons/dtos/response.dto';
import { JwtAuthGuard } from '../../../../../commons/middlewares/auth-guard.middleware';
import { LoginBodyDto } from '../dtos/login.dto';
import { User } from '../schemas/user.schema';
import { LoginService } from '../services/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  async createUser(@Body() body: LoginBodyDto): Promise<ResponseDto<User>> {
    try {
      const data = await this.loginService.createUser(body);
      return new ResponseDto(data, 201, '');
    } catch (error) {
      Logger.error(
        LoginController.name +
          ' | ' +
          this.createUser.name +
          ' | ' +
          error.message,
      );
    }
  }

  @Post()
  async loginUser(@Body() body: LoginBodyDto): Promise<ResponseDto<any>> {
    try {
      const data = await this.loginService.loginUser(body);
      return new ResponseDto(data, HttpStatus.ACCEPTED);
    } catch (error) {
      Logger.error(
        LoginController.name +
          ' | ' +
          this.loginUser.name +
          ' | ' +
          error.message,
      );
      throw new HttpException(error.message, error.status);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string | null,
  ): Promise<ResponseDto<Partial<User[]>>> {
    try {
      const data = await this.loginService.getUserList(page, limit, search);
      return new ResponseDto(data, HttpStatus.OK);
    } catch (error) {
      Logger.error(
        LoginController.name +
          ' | ' +
          this.getUsers.name +
          ' | ' +
          error.message,
      );
      throw new HttpException(error.message, error.status);
    }
  }
}
