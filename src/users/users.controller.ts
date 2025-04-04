import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    ParseIntPipe,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
  import { User } from './entities/user.entity';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    // Создание пользователя
    // (Здесь можно решить, открытый ли это эндпоинт или требующий авторизации)
    // Для наглядности — пусть будет под защитой JWT
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.create(createUserDto);
    }
  
    // Получение всех пользователей
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    // Получение одного пользователя
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
      return this.usersService.findOne(id);
    }
  
    // Обновление
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.usersService.update(id, updateUserDto);
    }
  
    // Удаление
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.usersService.remove(id);
    }
  }
  