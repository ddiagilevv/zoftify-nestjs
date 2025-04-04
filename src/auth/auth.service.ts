import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
      email: user.email,
    };
  }

  async register(dto: RegisterDto) {
    // Check if user already exists
    const found = await this.userService.findByEmail(dto.email);
    if (found) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const hash = await bcrypt.hash(dto.password, 10);
    // Reuse userService to create
    const newUser = await this.userService.createUser({
      email: dto.email,
      password: hash,
      name: dto.name,
    });
    return {
      message: 'Registration successful',
      userId: newUser.id,
      email: newUser.email,
    };
  }
}
