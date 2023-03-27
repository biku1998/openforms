import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FormQuestion, Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import { AppEventType } from 'src/events/types/events';
import { ArchivedFormException } from 'src/forms/exceptions';
import { FormsService } from 'src/forms/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaErrorCode } from 'src/shared/prisma-error-codes';
import {
  QuestionArchivedEvent,
  QuestionCreatedEvent,
  QuestionUpdatedEvent,
  QuestionRestoredEvent,
} from '../events';

import {
  DuplicateFormQuestionException,
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

  async addQuestionToForm(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    position: number;
  }): Promise<FormQuestion> {
    try {
      const { formId, questionId, questionType, position } = params;

      const formQuestion = await this.prismaService.formQuestion.create({
        data: {
          questionId,
          questionType,
          position,
          form: {
            connect: {
              id: formId,
            },
          },
        },
      });
      return formQuestion;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new DuplicateFormQuestionException({
            formId: params.formId,
            questionId: params.questionId,
            questionType: params.questionType,
          });
        }
      }
    }
  }

  async doesQuestionExistInForm(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
  }) {
    const { formId, questionId, questionType } = params;

    const formQuestion = await this.prismaService.formQuestion.findUnique({
      where: {
        formId_questionId_questionType: {
          formId,
          questionId,
          questionType,
        },
      },
    });
    return Boolean(formQuestion);
  }

  async create(params: {
    formId: number;
    userId: number;
    payload: QuestionCreateInput;
  }): Promise<Question> {
    const { formId, userId, payload } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    let question: Question;
    switch (payload.type) {
      case QuestionType.CHOICE: {
        const resp = await this.prismaService.choiceQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.CHOICE };
        break;
      }
      case QuestionType.DATE: {
        const resp = await this.prismaService.dateQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.DATE };
        break;
      }
      case QuestionType.FILE_UPLOAD: {
        const resp = await this.prismaService.fileUploadQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.FILE_UPLOAD };
        break;
      }
      case QuestionType.TEXT: {
        const resp = await this.prismaService.textQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.TEXT };
        break;
      }
      case QuestionType.NPS: {
        const resp = await this.prismaService.npsQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.NPS };
        break;
      }
      case QuestionType.RATING: {
        const resp = await this.prismaService.ratingQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.RATING };
        break;
      }
      case QuestionType.INFO: {
        const resp = await this.prismaService.infoQuestion.create({
          data: {
            ..._omit(payload, ['type']),
            createdByUser: {
              connect: {
                id: userId,
              },
            },
          },
        });
        question = { ...resp, type: QuestionType.INFO };
        break;
      }
    }

    // add question to form
    await this.addQuestionToForm({
      formId,
      questionId: question.id,
      questionType: payload.type,
      position: 0,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.QUESTION_CREATED,
      new QuestionCreatedEvent({
        id: question.id,
        userId: question.createdById,
        formId,
        payload,
      }),
    );

    return question;
  }

  async findOne(params: {
    id: number;
    questionType: QuestionType;
    userId: number;
  }): Promise<Question> {
    const { id, questionType, userId } = params;

    let question: Question;

    switch (questionType) {
      case QuestionType.CHOICE: {
        question = {
          ...(await this.prismaService.choiceQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.DATE: {
        question = {
          ...(await this.prismaService.dateQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.FILE_UPLOAD: {
        question = {
          ...(await this.prismaService.fileUploadQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.TEXT: {
        question = {
          ...(await this.prismaService.textQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.NPS: {
        question = {
          ...(await this.prismaService.npsQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.RATING: {
        question = {
          ...(await this.prismaService.ratingQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
      case QuestionType.INFO: {
        question = {
          ...(await this.prismaService.infoQuestion.findUnique({
            where: {
              id,
            },
          })),
          type: questionType,
        };
        break;
      }
    }

    if (question.createdById !== userId)
      throw new QuestionNotFoundException(question.id);

    return question;
  }

  async update(params: {
    userId: number;
    formId: number;
    id: number;
    payload: QuestionUpdateInput;
  }): Promise<Question> {
    const { userId, formId, id, payload } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    await this.findOne({
      id,
      questionType: payload.type,
      userId,
    });

    if (
      (await this.doesQuestionExistInForm({
        formId,
        questionId: id,
        questionType: payload.type,
      })) === false
    )
      throw new QuestionNotFoundException(id);

    let question: Question;
    switch (payload.type) {
      case QuestionType.CHOICE: {
        const resp = await this.prismaService.choiceQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.CHOICE };
        break;
      }
      case QuestionType.DATE: {
        const resp = await this.prismaService.dateQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.DATE };
        break;
      }
      case QuestionType.FILE_UPLOAD: {
        const resp = await this.prismaService.fileUploadQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.FILE_UPLOAD };
        break;
      }
      case QuestionType.TEXT: {
        const resp = await this.prismaService.textQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.TEXT };
        break;
      }
      case QuestionType.NPS: {
        const resp = await this.prismaService.npsQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.NPS };
        break;
      }
      case QuestionType.RATING: {
        const resp = await this.prismaService.ratingQuestion.update({
          data: _omit(payload, ['type']),
          where: {
            id,
          },
        });
        question = { ...resp, type: QuestionType.RATING };
        break;
      }
      case QuestionType.INFO: {
        const resp = await this.prismaService.infoQuestion.update({
          data: _omit(payload, ['type']),
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
        payload,
      }),
    );

    return question;
  }

  async archive(params: {
    userId: number;
    formId: number;
    id: number;
    questionType: QuestionType;
  }): Promise<Question> {
    const { userId, formId, id, questionType } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    await this.findOne({
      id,
      questionType,
      userId,
    });

    if (
      (await this.doesQuestionExistInForm({
        formId,
        questionId: id,
        questionType,
      })) === false
    )
      throw new QuestionNotFoundException(id);

    const data = {
      isActive: false,
    };

    let question: Question;
    switch (questionType) {
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
      AppEventType.QUESTION_ARCHIVED,
      new QuestionArchivedEvent({
        id: question.id,
        userId: question.createdById,
        formId,
      }),
    );

    return question;
  }

  async restore(params: {
    userId: number;
    formId: number;
    id: number;
    questionType: QuestionType;
  }): Promise<Question> {
    const { userId, formId, id, questionType } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    await this.findOne({
      id,
      questionType,
      userId,
    });

    if (
      (await this.doesQuestionExistInForm({
        formId,
        questionId: id,
        questionType,
      })) === false
    )
      throw new QuestionNotFoundException(id);

    const data = {
      isActive: true,
    };

    let question: Question;
    switch (questionType) {
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
      AppEventType.QUESTION_RESTORED,
      new QuestionRestoredEvent({
        id: question.id,
        userId: question.createdById,
        formId,
      }),
    );

    return question;
  }

  async findMany(params: {
    formId: number;
    userId: number;
    isActive?: boolean;
  }): Promise<Question[]> {
    const { userId, formId, isActive = true } = params;

    const form = await this.formsService.findOne({
      id: formId,
      userId,
    });

    if (form.isActive === false) throw new ArchivedFormException(form.id);

    // get links
    const formQuestions = await this.prismaService.formQuestion.findMany({
      where: {
        formId,
      },
    });

    if (formQuestions.length === 0) return [];

    const questions: Question[] = [];

    // prepare ids array for each type of question to save db calls
    const questionTypeIds: { [type in QuestionType]?: number[] } = {};

    formQuestions.forEach((formQuestion) => {
      if (questionTypeIds[formQuestion.questionType]) {
        questionTypeIds[formQuestion.questionType].push(
          formQuestion.questionId,
        );
      } else {
        questionTypeIds[formQuestion.questionType] = [formQuestion.questionId];
      }
    });

    for (const questionType of Object.keys(questionTypeIds)) {
      switch (questionType) {
        case QuestionType.CHOICE: {
          const choiceQuestions =
            await this.prismaService.choiceQuestion.findMany({
              where: {
                id: { in: questionTypeIds[questionType] },
                createdById: userId,
                isActive,
              },
            });

          choiceQuestions.forEach((cq) =>
            questions.push({ ...cq, type: questionType }),
          );
          break;
        }

        case QuestionType.DATE: {
          const dateQuestions = await this.prismaService.dateQuestion.findMany({
            where: {
              id: { in: questionTypeIds[questionType] },
              createdById: userId,
              isActive,
            },
          });

          dateQuestions.forEach((dq) =>
            questions.push({ ...dq, type: questionType }),
          );
          break;
        }

        case QuestionType.FILE_UPLOAD: {
          const fileUploadQuestions =
            await this.prismaService.fileUploadQuestion.findMany({
              where: {
                id: { in: questionTypeIds[questionType] },
                createdById: userId,
                isActive,
              },
            });

          fileUploadQuestions.forEach((fuq) =>
            questions.push({ ...fuq, type: questionType }),
          );
          break;
        }

        case QuestionType.INFO: {
          const infoQuestions = await this.prismaService.infoQuestion.findMany({
            where: {
              id: { in: questionTypeIds[questionType] },
              createdById: userId,
              isActive,
            },
          });

          infoQuestions.forEach((iq) =>
            questions.push({ ...iq, type: questionType }),
          );
          break;
        }

        case QuestionType.NPS: {
          const npsQuestions = await this.prismaService.npsQuestion.findMany({
            where: {
              id: { in: questionTypeIds[questionType] },
              createdById: userId,
              isActive,
            },
          });

          npsQuestions.forEach((npq) =>
            questions.push({ ...npq, type: questionType }),
          );
          break;
        }

        case QuestionType.RATING: {
          const ratingQuestions =
            await this.prismaService.ratingQuestion.findMany({
              where: {
                id: { in: questionTypeIds[questionType] },
                createdById: userId,
                isActive,
              },
            });

          ratingQuestions.forEach((rq) =>
            questions.push({ ...rq, type: questionType }),
          );
          break;
        }

        case QuestionType.TEXT: {
          const textQuestions = await this.prismaService.textQuestion.findMany({
            where: {
              id: { in: questionTypeIds[questionType] },
              createdById: userId,
              isActive,
            },
          });

          textQuestions.forEach((tq) =>
            questions.push({ ...tq, type: questionType }),
          );
          break;
        }
      }
    }
    return questions;
  }
}
