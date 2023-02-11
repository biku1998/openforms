import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FormQuestion, Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import { AppEventType } from 'src/events/types/events';
import { FormNotFoundException } from 'src/forms/exceptions';
import { FormsService } from 'src/forms/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorCode } from 'src/shared/prisma-error-codes';
import { QuestionCreatedEvent } from '../events/question-created.event';
import { QuestionUpdatedEvent } from '../events/question-updated.event';
import {
  DuplicateFormQuestionException,
  FormQuestionLinkNotFoundException,
  QuestionNotFoundException,
} from '../exceptions';
import {
  Question,
  QuestionCreateInput,
  QuestionType,
  QuestionUpdateInput,
} from '../types/question';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly formsService: FormsService,
  ) {}

  async getQuestionById(params: {
    id: number;
    questionType: QuestionType;
  }): Promise<Question> {
    const { id, questionType } = params;
    let resp: any;
    switch (questionType) {
      case QuestionType.CHOICE: {
        resp = await this.prismaService.choiceQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.DATE: {
        resp = await this.prismaService.dateQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.FILE_UPLOAD: {
        resp = await this.prismaService.fileUploadQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.TEXT: {
        resp = await this.prismaService.textQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.NPS: {
        resp = await this.prismaService.npsQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.RATING: {
        resp = await this.prismaService.ratingQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
      case QuestionType.INFO: {
        resp = await this.prismaService.infoQuestion.findUnique({
          where: {
            id,
          },
        });

        break;
      }
    }
    if (resp === null) throw new QuestionNotFoundException(id);
    return { ...resp, type: questionType };
  }

  async isQuestionLinkedToForm(params: {
    formId: number;
    questionId: number;
  }): Promise<boolean> {
    const { formId, questionId } = params;
    const resp = await this.prismaService.formQuestion.findUnique({
      where: {
        formId_questionId: {
          formId,
          questionId,
        },
      },
    });
    return Boolean(resp);
  }

  async linkQuestionToForm(params: {
    formId: number;
    questionId: number;
    position?: number;
    questionType: QuestionType;
  }): Promise<FormQuestion> {
    try {
      const { formId, questionId, position = 0, questionType } = params;
      const formQuestion = await this.prismaService.formQuestion.create({
        data: {
          form: {
            connect: {
              id: formId,
            },
          },
          questionId,
          position,
          questionType,
        },
      });
      return formQuestion;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.formId);
        }
        if (error.code === PrismaErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          const { formId, questionId } = params;
          throw new DuplicateFormQuestionException({ formId, questionId });
        }
      }
    }
  }

  async createQuestion(params: {
    formId: number;
    data: QuestionCreateInput;
  }): Promise<Question> {
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
        case QuestionType.INFO: {
          const resp = await this.prismaService.infoQuestion.create({
            data: _omit(data, ['type']),
          });
          question = { ...resp, type: QuestionType.INFO };
          break;
        }
      }

      // add question to form
      await this.linkQuestionToForm({
        formId,
        questionId: question.id,
        questionType: data.type,
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
          throw new FormNotFoundException(params.formId);
        }
      }
      throw error;
    }
  }

  async updateQuestion(params: {
    id: number;
    formId: number;
    data: QuestionUpdateInput;
  }): Promise<Question> {
    try {
      const { data, formId, id } = params;
      // check if the form exits
      await this.formsService.getFormById(formId);

      // check if question exists
      await this.getQuestionById({
        id,
        questionType: data.type,
      });

      // check if this question is linked to this form or not
      if (
        (await this.isQuestionLinkedToForm({ formId, questionId: id })) ===
        false
      )
        throw new FormQuestionLinkNotFoundException({
          formId,
          questionId: id,
        });

      let question: Question;
      switch (data.type) {
        case QuestionType.CHOICE: {
          const resp = await this.prismaService.choiceQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.CHOICE };
          break;
        }
        case QuestionType.DATE: {
          const resp = await this.prismaService.dateQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.DATE };
          break;
        }
        case QuestionType.FILE_UPLOAD: {
          const resp = await this.prismaService.fileUploadQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.FILE_UPLOAD };
          break;
        }
        case QuestionType.TEXT: {
          const resp = await this.prismaService.textQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.TEXT };
          break;
        }
        case QuestionType.NPS: {
          const resp = await this.prismaService.npsQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.NPS };
          break;
        }
        case QuestionType.RATING: {
          const resp = await this.prismaService.ratingQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.RATING };
          break;
        }
        case QuestionType.INFO: {
          const resp = await this.prismaService.infoQuestion.update({
            data: _omit(data, ['type']),
            where: {
              id,
            },
          });
          question = { ...resp, type: QuestionType.INFO };
          break;
        }
      }

      // fire events
      this.eventEmitter.emit(
        AppEventType.QUESTION_UPDATED,
        new QuestionUpdatedEvent({
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
          console.log(error);
          throw new FormNotFoundException(params.formId);
        }
      }
      throw error;
    }
  }
}
