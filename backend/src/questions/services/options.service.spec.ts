import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { FormsModule } from 'src/forms/forms.module';
import { FormsService } from 'src/forms/services';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/services';
import { UsersModule } from 'src/users/users.module';
import { QuestionsModule } from '../questions.module';
import { ChoiceType, QuestionType } from '../types/question';
import { OptionsService } from './options.service';
import { QuestionsService } from './questions.service';

describe('OptionService', () => {
  let service: OptionsService;
  let formsService: FormsService;
  let questionsService: QuestionsService;
  let userId: number;
  let formId: number;
  let questionId: number;

  const eventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService],
      imports: [
        PrismaModule,
        UsersModule,
        FormsModule,
        QuestionsModule,
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
    })
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .compile();

    const prismaService = module.get<PrismaService>(PrismaService);
    // wipe database before every test
    await prismaService.wipeDatabase();

    const userPayload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };
    const usersService = await module.get<UsersService>(UsersService);
    const user = await usersService.create(userPayload);
    userId = user.id;

    const formPayload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };
    formsService = await module.get<FormsService>(FormsService);
    const form = await formsService.create({
      payload: formPayload,
      userId,
    });
    formId = form.id;

    const questionPayload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.RADIO,
      content: 'Mcq question',
    };
    questionsService = await module.get<QuestionsService>(FormsService);
    const question = await questionsService.create({
      formId,
      userId,
      payload: questionPayload,
    });
    questionId = question.id;

    questionsService = module.get<QuestionsService>(QuestionsService);
  });
});
