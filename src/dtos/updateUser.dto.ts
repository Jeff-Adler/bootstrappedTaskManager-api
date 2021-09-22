import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @Expose()
  @IsEmail()
  @IsOptional()
  email!: string;

  @Expose()
  @IsString()
  @IsOptional()
  password!: string;
}
