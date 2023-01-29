import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import { AppEventType } from 'src/events/types/events';
import { FormsService } from 'src/forms/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormNotFoundError, PrismaErrorCode } from 'src/shared/errors';
import { QuestionCreatedEvent } from '../events/question-created.event';
import { Question, QuestionCreateInput, QuestionType } from '../types/question';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly formsService: FormsService,
  ) {}

  async createQuestion(params: { formId: number; data: QuestionCreateInput }) {
    try {
      const { data, formId } = params;
      // check if the form exits
      await this.formsService.getFormById(formId);

      let question: Question;
      switch (data.type) {
        case QuestionType.CHOICE: {
          const resp = await this.prismaService.choiceQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.CHOICE };
          break;
        }
        case QuestionType.DATE: {
          const resp = await this.prismaService.dateQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.DATE };
          break;
        }
        case QuestionType.FILE_UPLOAD: {
          const resp = await this.prismaService.fileUploadQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.FILE_UPLOAD };
          break;
        }
        case QuestionType.TEXT: {
          const resp = await this.prismaService.textQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.TEXT };
          break;
        }
        case QuestionType.NPS: {
          const resp = await this.prismaService.npsQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.NPS };
          break;
        }
        case QuestionType.RATING: {
          const resp = await this.prismaService.ratingQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.RATING };
          break;
        }
      }

      // create formQuestion entry to link this question to form
      await this.prismaService.formQuestion.create({
        data: {
          form: { connect: { id: formId } },
          questionId: question.id,
          position: 0,
          questionType: data.type,
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.QUESTION_CREATED,
        new QuestionCreatedEvent({
          id: question.id,
          userId: question.createdById,
          formId,
          payload: data,
        }),
      );

      return question;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundError({
            message: `form ${params.formId} does not exists`,
            id: params.formId,
          });
        }
      }
      throw error;
    }
  }
}
