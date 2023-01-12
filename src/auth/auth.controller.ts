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

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Public } from 'src/utils/public.decorator';
import { UserSession } from 'src/utils/types';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      userId: user.id,
      userEmail: user.email,
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
      userId: user.id,
      userEmail: user.email,
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
        resolve(null);
      });
    });
  }
}
