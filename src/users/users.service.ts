import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  import { User } from './entities/user.entity';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Injectable()
  export class UsersService {
    private readonly SALT_ROUNDS = 10;
  
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<User> {
      const existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
  
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        this.SALT_ROUNDS,
      );
  
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
  
      return this.userRepository.save(newUser);
    }
  
    async findAll(): Promise<User[]> {
      return this.userRepository.find();
    }
  
    async findOne(id: number): Promise<User> {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id=${id} not found`);
      }
      return user;
    }
  
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
      const user = await this.findOne(id);
  
      if (updateUserDto.email) {
        // проверить, нет ли другого пользователя с тем же email
        const conflictUser = await this.userRepository.findOneBy({
          email: updateUserDto.email,
        });
        if (conflictUser && conflictUser.id !== id) {
          throw new ConflictException('Email already in use');
        }
      }
  
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(
          updateUserDto.password,
          this.SALT_ROUNDS,
        );
        updateUserDto.password = hashedPassword;
      }
  
      Object.assign(user, updateUserDto);
      return this.userRepository.save(user);
    }
  
    async remove(id: number): Promise<void> {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
    }
  
    // Методы, необходимые для AuthService (поиск по email)
    async findByEmail(email: string): Promise<User | null> {
      return this.userRepository.findOneBy({ email });
    }
  }
  