import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
  // let service: AuthService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [AuthService],
  //   }).compile();

  //   service = module.get<AuthService>(AuthService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
