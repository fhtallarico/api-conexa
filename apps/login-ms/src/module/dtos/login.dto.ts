import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class LoginBodyDto {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}

export class TokenDto {
  @Type(() => String)
  token: string;
}
