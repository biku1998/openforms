import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { AppEventType } from 'src/events/types/events';
import {
  ArchivedFormException,
  FormNotFoundException,
} from 'src/forms/exceptions';
import { FormsModule } from 'src/forms/forms.module';
import { FormsService } from 'src/forms/services';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/services';
import { UsersModule } from 'src/users/users.module';
import {
  ArchivedQuestionException,
  QuestionNotFoundException,
} from '../exceptions';
import {
  ArchivedOptionException,
  OptionNotFoundException,
} from '../exceptions/option.exception';
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
  let questionType: QuestionType;

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
    const usersService = module.get<UsersService>(UsersService);
    const user = await usersService.create(userPayload);
    userId = user.id;

    const formPayload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };
    formsService = module.get<FormsService>(FormsService);
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
    questionsService = module.get<QuestionsService>(QuestionsService);
    const question = await questionsService.create({
      formId,
      userId,
      payload: questionPayload,
    });
    questionId = question.id;
    questionType = question.type;

    service = module.get<OptionsService>(OptionsService);
  });

  it('should create a option', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    const option = await service.create({
      formId,
      userId,
      questionId,
      payload,
    });

    expect(option).toBeDefined();
    expect(option).toHaveProperty('content', payload.content);
    expect(option).toHaveProperty('questionId', questionId);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.OPTION_CREATED,
      {
        eventType: AppEventType.OPTION_CREATED,
        payload: {
          id: option.id,
          userId,
          formId,
          questionId,
          questionType,
          payload,
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to create a option for a question that does not exist', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    await expect(
      service.create({
        formId,
        userId,
        questionId: 101,
        payload,
      }),
    ).rejects.toThrow(QuestionNotFoundException);
  });

  it('should throw exception if we try to create a option for an archived question', async () => {
    await questionsService.archive({
      userId,
      formId,
      id: questionId,
      questionType,
    });

    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    await expect(
      service.create({
        formId,
        userId,
        questionId,
        payload,
      }),
    ).rejects.toThrow(ArchivedQuestionException);
  });

  it('should throw exception if we try to create a option for a question in a form that does not exist', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    await expect(
      service.create({
        formId: 101,
        userId,
        questionId,
        payload,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should throw exception if we try to create a option for a question for an archived form', async () => {
    await formsService.archive({
      userId,
      id: formId,
    });

    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    await expect(
      service.create({
        formId,
        userId,
        questionId,
        payload,
      }),
    ).rejects.toThrow(ArchivedFormException);
  });

  it('should update a option', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    const option = await service.create({
      formId,
      userId,
      questionId,
      payload,
    });

    const updatedOption = await service.update({
      id: option.id,
      formId,
      questionId,
      questionType,
      userId,
      payload: {
        content: 'option 1 content updated',
      },
    });

    expect(updatedOption).toBeDefined();
    expect(updatedOption).toHaveProperty('id', option.id);
    expect(updatedOption).toHaveProperty('content', 'option 1 content updated');

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.OPTION_UPDATED,
      {
        eventType: AppEventType.OPTION_UPDATED,
        payload: {
          id: updatedOption.id,
          userId,
          formId,
          questionId,
          questionType,
          payload: {
            content: 'option 1 content updated',
          },
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to update a option that does not exist', async () => {
    await expect(
      service.update({
        id: 1001,
        formId,
        userId,
        questionId,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(OptionNotFoundException);
  });

  it('should throw exception if we try to update an archived option', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    const option = await service.create({
      formId,
      userId,
      questionId,
      payload,
    });

    await service.archive({
      formId,
      id: option.id,
      questionId,
      questionType,
      userId,
    });

    await expect(
      service.update({
        id: option.id,
        formId,
        userId,
        questionId,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(ArchivedOptionException);
  });

  it('should throw exception if we try to update a option for a question that does not exist', async () => {
    await expect(
      service.update({
        id: 101,
        formId,
        userId,
        questionId: 1022,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(QuestionNotFoundException);
  });

  it('should throw exception if we try to update a option for an archived question', async () => {
    await questionsService.archive({
      formId,
      userId,
      id: questionId,
      questionType,
    });

    await expect(
      service.update({
        id: 101,
        formId,
        userId,
        questionId,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(ArchivedQuestionException);
  });

  it('should throw exception if we try to update a option for a question in a form that does not exist', async () => {
    await expect(
      service.update({
        id: 101,
        formId: 1022,
        userId,
        questionId,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should throw exception if we try to update a option for a question for an archived form', async () => {
    await formsService.archive({
      id: formId,
      userId,
    });

    await expect(
      service.update({
        id: 101,
        formId,
        userId,
        questionId,
        questionType,
        payload: {
          content: 'updated option',
        },
      }),
    ).rejects.toThrow(ArchivedFormException);
  });

  it('should archive a option', async () => {
    const payload = {
      content: 'option 1',
      position: 0,
      questionType,
    };

    const option = await service.create({
      formId,
      userId,
      questionId,
      payload,
    });

    const archivedOption = await service.archive({
      formId,
      id: option.id,
      userId,
      questionId,
      questionType,
    });

    expect(archivedOption).toHaveProperty('isActive', false);
    expect(archivedOption).toHaveProperty('id', option.id);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.OPTION_ARCHIVED,
      {
        eventType: AppEventType.OPTION_ARCHIVED,
        payload: {
          id: option.id,
          userId,
          formId,
          questionId,
          questionType,
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to archive a option that does not exist', async () => {
    await expect(
      service.archive({
        id: 101,
        formId,
        userId,
        questionId,
        questionType,
      }),
    ).rejects.toThrow(OptionNotFoundException);
  });

  it('should throw exception if we try to archive a option for a question that does not exist', async () => {
    async () => {
      await expect(
        service.archive({
          id: 101,
          formId,
          userId,
          questionId: 1011,
          questionType,
        }),
      ).rejects.toThrow(QuestionNotFoundException);
    };
  });

  it('should throw exception if we try to archive a option for an archived question', async () => {
    await questionsService.archive({
      formId,
      userId,
      id: questionId,
      questionType,
    });

    await expect(
      service.archive({
        id: 101,
        formId,
        userId,
        questionId,
        questionType,
      }),
    ).rejects.toThrow(ArchivedQuestionException);
  });

  it.todo(
    'should throw exception if we try to archive a option for a question in a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to archive a option for a question for an archived form',
  );

  it.todo('should restore a option');

  it.todo(
    'should throw exception if we try to restore a option that does not exist',
  );

  it.todo(
    'should throw exception if we try to restore a option for a question that does not exist',
  );

  it.todo(
    'should throw exception if we try to restore a option for an archived question',
  );

  it.todo(
    'should throw exception if we try to restore a option for a question in a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to restore a option for a question for an archived form',
  );

  it.todo('should delete a option');

  it.todo(
    'should throw exception if we try to delete a option that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete a option for a question that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete a option for an archived question',
  );

  it.todo(
    'should throw exception if we try to delete a option for a question in a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete a option for a question for an archived form',
  );
});
