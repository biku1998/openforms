import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { FormNotFoundException } from '../exceptions';
import { FormsModule } from '../forms.module';
import { FormsService } from './forms.service';
import { FormsSettingsService } from './forms.settings.service';
import { AppEventType } from 'src/events/types/events';

const formsService = {
  findOne: async (params: { id: number; userId: number }) => {
    const { id, userId } = params;
    if (id !== 1) throw new FormNotFoundException(id);
    return { id, userId };
  },
};

const prismaService = {
  formQuizSetting: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      formId: 1,
    }),
  },
};

describe('FormsSettingsService', () => {
  const formId = 1;
  const userId = 1;
  let service: FormsSettingsService;

  const eventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsSettingsService],
      imports: [
        PrismaModule,
        UsersModule,
        FormsModule,
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
    })
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .overrideProvider(FormsService)
      .useValue(formsService)
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    service = module.get<FormsSettingsService>(FormsSettingsService);
  });

  it('should create form quiz setting', async () => {
    const payload = {
      viewCorrectAnswers: false,
    };

    const formQuizSetting = await service.createQuizSetting({
      formId,
      userId,
      payload,
    });

    expect(formQuizSetting).toEqual({
      id: 1,
      formId,
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.FORM_QUIZ_SETTING_CREATED,
      {
        eventType: AppEventType.FORM_QUIZ_SETTING_CREATED,
        payload: {
          formId,
          userId,
          payload,
        },
        userId,
      },
    );
  });

  it.todo(
    'should throw exception if we try to create quiz setting for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to create quiz setting for an archived form',
  );

  it.todo('should update form quiz setting');

  it.todo(
    'should throw exception if we try to update quiz setting for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to update quiz setting for an archived form',
  );

  it.todo('should delete form quiz setting');

  it.todo(
    'should throw exception if we try to delete quiz setting for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete quiz setting for an archived form',
  );
});
