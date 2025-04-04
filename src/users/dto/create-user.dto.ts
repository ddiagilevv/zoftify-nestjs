import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  // name - опционально, но если будет, то проверим
  // Можно добавить любую валидацию, например IsString()
  name?: string;
}
