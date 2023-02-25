import { Module } from '@nestjs/common';
import { UsersService } from './services';
import { UsersController } from './controllers';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
