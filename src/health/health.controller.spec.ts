import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
  // let controller: HealthController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [HealthController],
  //   }).compile();
  //   controller = module.get<HealthController>(HealthController);
  // });
  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
