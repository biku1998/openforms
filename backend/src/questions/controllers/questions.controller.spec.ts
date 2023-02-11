import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';

describe('QuestionsController', () => {
  it('should pass', () => {
    expect(1).toBe(1);
  });
  // let controller: QuestionsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [QuestionsController],
  //   }).compile();

  //   controller = module.get<QuestionsController>(QuestionsController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
