import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    // Check if email is already in use
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.name = dto.name;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return `User with id=${id} has been deleted`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
