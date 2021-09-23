import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @Expose()
  @IsOptional()
  @IsString()
  description!: string;

  @Expose()
  @IsOptional()
  completed!: boolean;
}
