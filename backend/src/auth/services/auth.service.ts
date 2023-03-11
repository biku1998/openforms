import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AppEventType } from 'src/events/types/events';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/services';
import { hashPassword, matchPassword } from 'src/utils/password';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserLoggedInEvent, UserSignedUpEvent } from '../events/auth.event';
import { JwtPayload } from '../types';
import { PrismaErrorCode } from 'src/shared/prisma-error-codes';
import { UserAlreadyRegisteredException } from '../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    try {
      // hash password before saving
      const { ...payload } = dto;
      payload.password = await hashPassword(dto.password);

      const user = await this.userService.create(payload);

      // fire events
      this.eventEmitter.emit(
        AppEventType.USER_SIGNED_UP,
        new UserSignedUpEvent({
          payload: dto,
          userId: user.id,
        }),
      );
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new UserAlreadyRegisteredException(dto.email);
        }
      }
    }
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
    return null;
  }

  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
