import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Option, Prisma } from '@prisma/client';
import { AppEventType } from 'src/events/types/events';
import { ArchivedFormException } from 'src/forms/exceptions';
import { FormsService } from 'src/forms/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorCode } from 'src/shared/prisma-error-codes';
import {
  OptionCreatedEvent,
  OptionUpdatedEvent,
  OptionArchivedEvent,
  OptionRestoredEvent,
  OptionDeletedEvent,
} from '../events';
import {
  ArchivedQuestionException,
  QuestionNotFoundException,
} from '../exceptions';

import {
  ArchivedOptionException,
  OptionNotFoundException,
} from '../exceptions/option.exception';
import { QuestionType } from '../types/question';
import { QuestionsService } from './questions.service';

@Injectable()
export class OptionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly questionService: QuestionsService,
    private readonly formsService: FormsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findOne(params: { id: number; userId: number }) {
    const { id, userId } = params;
    const option = await this.prismaService.option.findUnique({
      where: {
        id,
      },
    });

    if (!option) throw new OptionNotFoundException(id);

    if (option.createdById !== userId) throw new OptionNotFoundException(id);

    return option;
  }

  async create(params: {
    formId: number;
    questionId: number;
    payload: Pick<
      Prisma.OptionCreateInput,
      'content' | 'position' | 'questionType'
    >;
    userId: number;
  }): Promise<Option> {
    try {
      const { formId, questionId, payload, userId } = params;

      const form = await this.formsService.findOne({
        id: formId,
        userId,
      });

      if (form.isActive === false) throw new ArchivedFormException(form.id);

      await this.questionService.findOne({
        id: questionId,
        questionType: payload.questionType,
        userId,
      });

      const question = await this.questionService.findOne({
        id: questionId,
        questionType: payload.questionType,
        userId,
      });

      if (question.isActive === false)
        throw new ArchivedQuestionException(questionId);

      // create option
      const option = await this.prismaService.option.create({
        data: {
          ...payload,
          createdByUser: {
            connect: {
              id: userId,
            },
          },
          questionId,
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_CREATED,
        new OptionCreatedEvent({
          id: option.id,
          payload,
          userId,
          formId,
          questionId,
          questionType: payload.questionType,
        }),
      );

      return option;
    } catch (error) {
      throw error;
    }
  }

  async update(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    payload: Pick<Prisma.OptionUpdateInput, 'content' | 'position'> & {
      imageFileId?: number;
    };
    userId: number;
  }): Promise<Option> {
    const { formId, questionId, payload, userId, questionType, id } = params;

    const { imageFileId, ...updatePayload } = payload;

    if (imageFileId) {
      updatePayload['image'] = {
        connect: {
          id: imageFileId,
        },
      };
    }

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    const question = await this.questionService.findOne({
      id: questionId,
      questionType,
      userId,
    });

    if (question.isActive === false)
      throw new ArchivedQuestionException(questionId);

    if (
      (await this.questionService.doesQuestionExistInForm({
        formId,
        questionId,
        questionType,
      })) === false
    )
      throw new QuestionNotFoundException(questionId);

    const optionToUpdate = await this.findOne({
      id,
      userId,
    });

    if (optionToUpdate.isActive === false)
      throw new ArchivedOptionException(id);

    // update option
    const option = await this.prismaService.option.update({
      where: { id },
      data: {
        ...updatePayload,
        lastUpdatedByUser: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.OPTION_UPDATED,
      new OptionUpdatedEvent({
        id: option.id,
        payload,
        userId,
        formId,
        questionId,
        questionType,
      }),
    );

    return option;
  }

  async archive(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    userId: number;
  }) {
    const { id, formId, questionId, questionType, userId } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    const question = await this.questionService.findOne({
      id: questionId,
      questionType,
      userId,
    });

    if (question.isActive === false)
      throw new ArchivedQuestionException(questionId);

    if (
      (await this.questionService.doesQuestionExistInForm({
        formId,
        questionId,
        questionType,
      })) === false
    )
      throw new QuestionNotFoundException(questionId);

    await this.findOne({
      id,
      userId,
    });

    const option = await this.prismaService.option.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.OPTION_ARCHIVED,
      new OptionArchivedEvent({
        id: option.id,
        userId,
        formId,
        questionId,
        questionType,
      }),
    );

    return option;
  }

  async restore(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    userId: number;
  }) {
    const { id, formId, questionId, questionType, userId } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    const question = await this.questionService.findOne({
      id: questionId,
      questionType,
      userId,
    });

    if (question.isActive === false)
      throw new ArchivedQuestionException(questionId);

    if (
      (await this.questionService.doesQuestionExistInForm({
        formId,
        questionId,
        questionType,
      })) === false
    )
      throw new QuestionNotFoundException(questionId);

    await this.findOne({
      id,
      userId,
    });

    const option = await this.prismaService.option.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.OPTION_RESTORED,
      new OptionRestoredEvent({
        id: option.id,
        userId,
        formId,
        questionId,
        questionType,
      }),
    );

    return option;
  }
}
