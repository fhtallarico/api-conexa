import { IsNotEmpty } from 'class-validator';

export class ResponseDto<T> {
  @IsNotEmpty()
  data: T;

  @IsNotEmpty()
  errorMessage: string;

  @IsNotEmpty()
  statusCode: number;

  constructor(data: T, statusCode: number, errorMessage = '') {
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}
