import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Option, Prisma } from '@prisma/client';
import { AppEventType } from 'src/events/types/events';
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

import { OptionNotFoundException } from '../exceptions/option.exception';
import { QuestionType } from '../types/question';
import { QuestionsService } from './questions.service';

@Injectable()
export class OptionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly questionService: QuestionsService,
    private readonly formService: FormsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getOption(params: {
    id: number;
    userId?: number;
    questionId?: number;
    questionType?: QuestionType;
  }): Promise<Option> {
    const { id, userId, questionId, questionType } = params;
    if (userId || questionType) {
      const option = await this.prismaService.option.findFirst({
        where: {
          id,
          createdById: userId,
          questionId,
          questionType,
        },
      });

      if (!option)
        throw new OptionNotFoundException({
          optionId: id,
          questionId,
          questionType,
        });

      return option;
    }
    const option = await this.prismaService.option.findUnique({
      where: {
        id_questionId: {
          id,
          questionId,
        },
      },
    });

    if (!option)
      throw new OptionNotFoundException({
        optionId: id,
        questionId,
        questionType,
      });

    return option;
  }

  async createOption(params: {
    formId: number;
    questionId: number;
    data: Prisma.OptionCreateInput;
    userId: number;
  }): Promise<Option> {
    try {
      const { formId, questionId, data, userId } = params;
      // check if form exists with creator
      await this.formService.getForm({
        id: formId,
        userId,
      });

      // check if formQuestion exists
      await this.questionService.getFormQuestion({
        formId,
        questionId,
        questionType: data.questionType,
      });

      // create option
      const option = await this.prismaService.option.create({ data });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_CREATED,
        new OptionCreatedEvent({
          id: option.id,
          payload: data,
          userId,
          formId,
          questionId,
          questionType: data.questionType,
        }),
      );

      return option;
    } catch (error) {
      throw error;
    }
  }

  async updateOption(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    data: Prisma.OptionUpdateInput;
    userId: number;
  }): Promise<Option> {
    try {
      const { formId, questionId, data, userId, questionType, id } = params;
      // check if form exists with creator
      await this.formService.getForm({
        id: formId,
        userId,
      });

      // check if formQuestion exists
      await this.questionService.getFormQuestion({
        formId,
        questionId,
        questionType,
      });

      // update option
      const option = await this.prismaService.option.update({
        where: { id },
        data,
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_UPDATED,
        new OptionUpdatedEvent({
          id: option.id,
          payload: data,
          userId,
          formId,
          questionId,
          questionType,
        }),
      );

      return option;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          const { questionId, id, questionType } = params;
          throw new OptionNotFoundException({
            optionId: id,
            questionId,
            questionType,
          });
        }
      }
      throw error;
    }
  }

  async archiveOption(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    userId: number;
  }): Promise<boolean> {
    try {
      const { formId, questionId, id, questionType, userId } = params;

      // check if form exists with creator
      await this.formService.getForm({
        id: formId,
        userId,
      });

      // check if formQuestion exists
      await this.questionService.getFormQuestion({
        formId,
        questionId,
        questionType,
      });

      // archive options
      await this.prismaService.option.update({
        where: {
          id_questionId: {
            id,
            questionId,
          },
        },
        data: {
          isActive: false,
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_ARCHIVED,
        new OptionArchivedEvent({
          id,
          userId,
          formId,
          questionId,
          questionType,
        }),
      );

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new OptionNotFoundException({
            ...params,
            optionId: params.id,
          });
        }
      }
      throw error;
    }
  }

  async restoreOption(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    userId: number;
  }): Promise<boolean> {
    try {
      const { formId, questionId, id, questionType, userId } = params;

      // check if form exists with creator
      await this.formService.getForm({
        id: formId,
        userId,
      });

      // check if formQuestion exists
      await this.questionService.getFormQuestion({
        formId,
        questionId,
        questionType,
      });

      // archive options
      await this.prismaService.option.update({
        where: {
          id_questionId: {
            id,
            questionId,
          },
        },
        data: {
          isActive: true,
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_RESTORED,
        new OptionRestoredEvent({
          id,
          userId,
          formId,
          questionId,
          questionType,
        }),
      );

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new OptionNotFoundException({
            ...params,
            optionId: params.id,
          });
        }
      }
      throw error;
    }
  }

  async deleteOption(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    id: number;
    userId: number;
  }): Promise<boolean> {
    try {
      const { formId, questionId, userId, questionType, id } = params;
      // check if form exists with creator
      await this.formService.getForm({
        id: formId,
        userId,
      });

      // check if formQuestion exists
      await this.questionService.getFormQuestion({
        formId,
        questionId,
        questionType,
      });

      await this.prismaService.option.delete({
        where: {
          id_questionId: {
            id,
            questionId,
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.OPTION_DELETED,
        new OptionDeletedEvent({
          id,
          userId,
          formId,
          questionId,
          questionType,
        }),
      );

      return true;
    } catch (error) {
      throw error;
    }
  }
}
