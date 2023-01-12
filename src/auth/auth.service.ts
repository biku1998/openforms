import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'shared-ts';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hashPassword, matchPassword } from 'src/utils/password';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(dto: CreateUserDto): Promise<User> {
    // check if the user email already exists or not
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) throw new BadRequestException('Email already registered');

    dto.password = await hashPassword(dto.password);
    const user = await this.userService.create(dto);
    return user;
  }

  async login(dto: LoginUserDto): Promise<User | null> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) return null;

    if (
      await matchPassword({
        hashedPassword: user.password,
        plainPassword: dto.password,
      })
    )
      return user;
  }
}
