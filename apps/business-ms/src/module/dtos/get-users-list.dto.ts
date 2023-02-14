import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetUsersListBodyDto {
  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsOptional()
  @IsString()
  search: string | null;
}
