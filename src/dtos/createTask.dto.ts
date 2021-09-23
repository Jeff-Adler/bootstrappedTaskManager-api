import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @Expose()
  @IsString()
  description!: string;
}
