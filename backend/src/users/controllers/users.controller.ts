import { Controller, Get, Req } from '@nestjs/common';
import _omit from 'lodash/omit';
import { RequestWithUser } from 'src/utils/types';
import { UsersService } from '../services';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get('me')
  // async me(@Req() req: RequestWithUser) {
  //   if (!session.user) throw new UnauthorizedException();
  //   const userEmail = req.user.email;
  //   const user = await this.userService.findByEmail(userEmail);

  //   const { password: _, ...safeUser } = user;
  //   return safeUser;
  // }

  @Get('me')
  async me(@Req() req: RequestWithUser) {
    return _omit(req.user, ['password']);
  }
}
