import { IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsOptional()
  name?: string;
}
