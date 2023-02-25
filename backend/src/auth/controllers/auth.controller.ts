import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Public } from 'src/utils/public.decorator';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserAlreadyRegisteredException } from '../exceptions';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      await this.authService.register(dto);
    } catch (error) {
      if (error instanceof UserAlreadyRegisteredException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.login(dto);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = await this.authService.generateToken({
      sub: user.id,
    });

    return {
      token,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout() {
    // return new Promise((resolve, reject) => {
    //   session.destroy((err) => {
    //     if (err) reject(err);
    //     // fire events
    //     this.eventEmitter.emit(
    //       AppEventType.USER_LOGGED_OUT,
    //       new UserLoggedOutEvent({
    //         userId: req.user.id,
    //       }),
    //     );
    //     resolve(null);
    //   });
    // });
  }
}
