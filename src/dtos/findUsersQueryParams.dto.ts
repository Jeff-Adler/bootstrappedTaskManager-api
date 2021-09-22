import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class findUsersQueryParamsDto {
  @Expose()
  @IsOptional()
  skip!: string;

  @Expose()
  @IsOptional()
  take!: string;

  //TODO: add custom validator
  @Expose()
  @IsOptional()
  order!: string | string[];
}
