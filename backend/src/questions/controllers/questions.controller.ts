import {
  Controller,
  Session as GetSession,
  Param,
  Post,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  Body,
  Patch,
  Get,
} from '@nestjs/common';
import { FormNotFoundException } from 'src/forms/exceptions';
import { UserSession } from 'src/utils/types';
import { CreateQuestionDto } from '../dtos';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import {
  FormQuestionLinkNotFoundException,
  QuestionNotFoundException,
} from '../exceptions';
import { QuestionsService } from '../services/questions.service';
import { Question, QuestionCreateInput } from '../types/question';

@Controller('forms/:formId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuestions(
    @GetSession() session: UserSession,
    @Param(
      'formId',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('formId must be a number');
        },
      }),
    )
    formId: number,
  ) {
    return [];
  }

  @Post()
  async createQuestion(
    @GetSession() session: UserSession,
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
      const question = await this.questionsService.createQuestion({
        formId,
        data: {
          ...createQuestionDto,
          createdByUser: {
            connect: {
              id: session.user.id,
            },
          },
          // TODO : investigate later if there is a better way to do this
        } as QuestionCreateInput,
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
    @GetSession() session: UserSession,
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
      const question = await this.questionsService.updateQuestion({
        formId,
        id,
        data: {
          ...updateQuestionDto,
          lastUpdatedByUser: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
      return question;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof FormQuestionLinkNotFoundException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof QuestionNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
