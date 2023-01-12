import {
  Controller,
  Get,
  Session as GetSession,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSession } from 'src/utils/types';
import { UsersService } from './users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  async me(@GetSession() session: UserSession) {
    if (!session.user) throw new UnauthorizedException();
    const userEmail = session.user.userEmail;
    const user = await this.userService.findByEmail(userEmail);

    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}
