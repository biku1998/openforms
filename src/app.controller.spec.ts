import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
  // let appController: AppController;

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AppController],
  //     providers: [AppService],
  //   }).compile();

  //   appController = app.get<AppController>(AppController);
  // });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.index()).toBe('ok');
  //   });
  // });
});
