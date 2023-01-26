import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  Request,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppEventType } from 'src/events/types/events';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Public } from 'src/utils/public.decorator';
import { UserSession } from 'src/utils/types';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserLoggedOutEvent } from './events/auth.event';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/register')
  async register(
    @GetSession() session: UserSession,
    @Req() request: Request,
    @Ip() ip,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.authService.register(dto);

    session.user = {
      id: user.id,
      email: user.email,
      userAgent: request.headers['user-agent'],
      ipAddress: ip,
      lastLogin: new Date().toISOString(),
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  async login(
    @GetSession() session: UserSession,
    @Req() request: Request,
    @Ip() ip,
    @Body() dto: LoginUserDto,
  ) {
    const user = await this.authService.login(dto);

    if (!user) throw new UnauthorizedException();

    session.user = {
      id: user.id,
      email: user.email,
      userAgent: request.headers['user-agent'],
      ipAddress: ip,
      lastLogin: new Date().toISOString(),
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('local/logout')
  async logout(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);

        // fire events
        this.eventEmitter.emit(
          AppEventType.USER_LOGGED_OUT,
          new UserLoggedOutEvent({
            userId: session.user.id,
          }),
        );
        resolve(null);
      });
    });
  }
}
