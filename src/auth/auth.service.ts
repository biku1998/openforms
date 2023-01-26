import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import { AppEventType } from 'src/events/types/events';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hashPassword, matchPassword } from 'src/utils/password';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserLoggedInEvent, UserSignedUpEvent } from './events/auth.event';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    // check if the user email already exists or not
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) throw new BadRequestException('Email already registered');

    dto.password = await hashPassword(dto.password);
    const user = await this.userService.create(dto);

    // fire events
    this.eventEmitter.emit(
      AppEventType.USER_SIGNED_UP,
      new UserSignedUpEvent({
        payload: dto,
        userId: user.id,
      }),
    );
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
    ) {
      // fire events
      this.eventEmitter.emit(
        AppEventType.USER_LOGGED_IN,
        new UserLoggedInEvent({
          userId: user.id,
        }),
      );
      return user;
    }
  }
}
