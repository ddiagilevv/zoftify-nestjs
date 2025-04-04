import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Регистрируем нового пользователя
    const user = await this.usersService.create(createUserDto);
    // Сразу генерируем токен
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    // Проверяем логин/пароль
    const user = await this.authService.validateUser(email, password);
    // Возвращаем токен
    return this.authService.login(user);
  }
}
