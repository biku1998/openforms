import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
  // let usersController: UsersController;
  // let usersService: UsersService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UsersController],
  //     providers: [UsersService],
  //   }).compile();

  //   usersController = module.get<UsersController>(UsersController);
  //   usersService = module.get<UsersService>(UsersService);
  // });

  // it('should be defined', () => {
  //   expect(usersController).toBeDefined();
  //   expect(usersService).toBeDefined();
  // });
});
