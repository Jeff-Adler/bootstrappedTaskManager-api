import { Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @Length(8)
  password!: string;
}
