import {
  Controller,
  Param,
  Post,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  Body,
  Patch,
  Get,
  Query,
  DefaultValuePipe,
  Delete,
  ParseEnumPipe,
  Req,
} from '@nestjs/common';
import { FormNotFoundException } from 'src/forms/exceptions';
import { ItemState, RequestWithUser } from 'src/utils/types';
import { CreateQuestionDto } from '../dtos';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import {
  FormQuestionNotFoundException,
  QuestionNotFoundException,
} from '../exceptions';
import { QuestionsService } from '../services/questions.service';
import { Question, QuestionCreateInput, QuestionType } from '../types/question';

@Controller('forms/:formId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions(
    @Req() req: RequestWithUser,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
    @Query('state', new DefaultValuePipe(ItemState.active)) state?: string,
  ) {
    try {
      const questions = await this.questionsService.findMany({
        formId,
        userId: req.user.id,
        isActive: state === ItemState.active,
      });
      return questions;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async createQuestion(
    @Req() req: RequestWithUser,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    try {
      const question = await this.questionsService.create({
        formId,
        userId: req.user.id,
        payload: createQuestionDto,
      });
      return question;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateQuestion(
    @Req() req: RequestWithUser,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    try {
      const question = await this.questionsService.update({
        formId,
        id,
        userId: req.user.id,
        payload: updateQuestionDto,
      });
      return question;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof FormQuestionNotFoundException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof QuestionNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id/archive')
  async archiveQuestion(
    @Req() req: RequestWithUser,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Query(
      'type',
      new ParseEnumPipe(QuestionType, {
        exceptionFactory: () => {
          throw new BadRequestException(
            `questionType query param is required and must be one of [${Object.keys(
              QuestionType,
            ).join(', ')}] these`,
          );
        },
      }),
    )
    questionType: QuestionType,
  ) {
    try {
      const question = await this.questionsService.archive({
        formId,
        id,
        userId: req.user.id,
        questionType,
      });
      return question;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof FormQuestionNotFoundException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof QuestionNotFoundException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id/restore')
  async restoreQuestion(
    @Req() req: RequestWithUser,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Query(
      'type',
      new ParseEnumPipe(QuestionType, {
        exceptionFactory: () => {
          throw new BadRequestException(
            `questionType query param is required and must be one of [${Object.keys(
              QuestionType,
            ).join(', ')}] these`,
          );
        },
      }),
    )
    questionType: QuestionType,
  ) {
    try {
      const question = await this.questionsService.restore({
        formId,
        id,
        userId: req.user.id,
        questionType,
      });
      return question;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof FormQuestionNotFoundException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof QuestionNotFoundException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  // @Delete(':id')
  // async deleteQuestion(
  //   @Req() req: RequestWithUser,
  //   @Param(
  //     'formId',
  //     new ParseIntPipe({
  //       exceptionFactory: () => {
  //         throw new BadRequestException('formId must be a number');
  //       },
  //     }),
  //   )
  //   formId: number,
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       exceptionFactory: () => {
  //         throw new BadRequestException('id must be a number');
  //       },
  //     }),
  //   )
  //   id: number,
  //   @Query(
  //     'type',
  //     new ParseEnumPipe(QuestionType, {
  //       exceptionFactory: () => {
  //         throw new BadRequestException(
  //           `questionType query param is required and must be one of [${Object.keys(
  //             QuestionType,
  //           ).join(', ')}] these`,
  //         );
  //       },
  //     }),
  //   )
  //   questionType: QuestionType,
  // ) {
  //   try {
  //     await this.questionsService.deleteQuestion({
  //       formId,
  //       id,
  //       userId: req.user.id,
  //       questionType,
  //     });
  //   } catch (error) {
  //     if (error instanceof FormNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     if (error instanceof QuestionNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }

  //     if (error instanceof FormQuestionNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }

  //     throw error;
  //   }
  // }
}
