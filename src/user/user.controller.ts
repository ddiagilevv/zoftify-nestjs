import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto, UpdateUserDto } from './user.dto';
  import { JwtAuthGuard } from '../auth/jwt.guard';
  
  @Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}
  
    // Create user
    @Post()
    create(@Body() dto: CreateUserDto) {
      return this.userService.createUser(dto);
    }
  
    // Retrieve all (protected)
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    // Retrieve one (protected)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }
  
    // Update user (protected)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
      return this.userService.updateUser(id, dto);
    }
  
    // Delete user (protected)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.userService.deleteUser(id);
    }
  }
  