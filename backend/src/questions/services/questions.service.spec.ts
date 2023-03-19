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
import { QuestionNotFoundException } from '../exceptions';
import { QuestionType, ChoiceType } from '../types/question';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let formsService: FormsService;
  let userId: number;
  let formId: number;

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

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should create a question', async () => {
    const payload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.RADIO,
      content: 'Mcq question',
    };

    const question = await service.create({
      formId,
      userId,
      payload,
    });

    const resp = await service.doesQuestionExistInForm({
      formId,
      questionId: question.id,
      questionType: payload.type,
    });

    expect(question).toHaveProperty('choiceType', ChoiceType.RADIO);
    expect(question).toHaveProperty('content', payload.content);
    expect(resp).toBe(true);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.QUESTION_CREATED,
      {
        eventType: AppEventType.QUESTION_CREATED,
        payload: {
          id: question.id,
          userId,
          formId,
          payload,
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to create a question for a form that does not exist', async () => {
    const payload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.RADIO,
      content: 'Mcq question',
    };

    await expect(
      service.create({
        formId: 1022,
        userId,
        payload,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should throw exception if we try to create a question for an archived form', async () => {
    const payload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.RADIO,
      content: 'Mcq question',
    };

    await formsService.archive({
      id: formId,
      userId,
    });

    await expect(
      service.create({
        formId,
        userId,
        payload,
      }),
    ).rejects.toThrow(ArchivedFormException);
  });

  it('should update a question', async () => {
    const payload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.CHECKBOX,
      content: 'Mcq question',
    };

    const question = await service.create({
      formId,
      userId,
      payload,
    });

    const updatedQuestion = await service.update({
      formId,
      id: question.id,
      payload: {
        type: QuestionType.CHOICE,
        content: 'Mcq question updated',
      },
      userId,
    });

    expect(updatedQuestion).toHaveProperty('content', 'Mcq question updated');

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.QUESTION_UPDATED,
      {
        eventType: AppEventType.QUESTION_UPDATED,
        payload: {
          id: question.id,
          userId,
          formId,
          payload: {
            type: QuestionType.CHOICE,
            content: 'Mcq question updated',
          },
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to update a question that does not exist', async () => {
    await expect(
      service.update({
        formId,
        id: 101,
        payload: {
          type: QuestionType.CHOICE,
          content: 'Mcq question updated',
        },
        userId,
      }),
    ).rejects.toThrow(QuestionNotFoundException);
  });

  it('should throw exception if we try to update a question for a form that does not exist', async () => {
    await expect(
      service.update({
        formId: 1001,
        id: 101,
        payload: {
          type: QuestionType.CHOICE,
          content: 'Mcq question updated',
        },
        userId,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should throw exception if we try to update a question for an archived form', async () => {
    await formsService.archive({
      id: formId,
      userId,
    });

    await expect(
      service.update({
        formId,
        id: 101,
        payload: {
          type: QuestionType.CHOICE,
          content: 'Mcq question updated',
        },
        userId,
      }),
    ).rejects.toThrow(ArchivedFormException);
  });

  it('archive a question', async () => {
    const payload = {
      type: QuestionType.CHOICE,
      choiceType: ChoiceType.RADIO,
      content: 'Mcq question',
    };

    const question = await service.create({
      formId,
      userId,
      payload,
    });

    const archivedQuestion = await service.archive({
      formId,
      userId,
      id: question.id,
      questionType: payload.type,
    });

    expect(archivedQuestion.isActive).toBe(false);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.QUESTION_ARCHIVED,
      {
        eventType: AppEventType.QUESTION_ARCHIVED,
        payload: {
          id: question.id,
          userId,
          formId,
        },
        userId,
      },
    );
  });

  it('should throw exception if we try to archive a question that does not exist', async () => {
    await expect(
      service.archive({
        formId,
        id: 101,
        questionType: QuestionType.CHOICE,
        userId,
      }),
    ).rejects.toThrow(ArchivedFormException);
  });

  it.todo(
    'should throw exception if we try to archive a question for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to archive a question for an archived form',
  );

  it.todo('restore a question');

  it.todo(
    'should throw exception if we try to restore a question that does not exist',
  );

  it.todo(
    'should throw exception if we try to restore a question for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to restore a question for an archived form',
  );

  it.todo('delete a question');

  it.todo(
    'should throw exception if we try to delete a question that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete a question for a form that does not exist',
  );

  it.todo(
    'should throw exception if we try to delete a question for an archived form',
  );
});
