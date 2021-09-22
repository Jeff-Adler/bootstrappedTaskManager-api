import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class FindUserByEmailDto {
  @Expose()
  @IsEmail()
  email!: string;
}
