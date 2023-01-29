import {
  Controller,
  Session as GetSession,
  Param,
  Post,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { FormNotFoundError } from 'src/shared/errors';
import { UserSession } from 'src/utils/types';
import { CreateQuestionDto } from '../dtos';
import { QuestionsService } from '../services/questions.service';
import { Question, QuestionCreateInput } from '../types/question';

@Controller('forms/:formId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

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
      console.log({ createQuestionDto });
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
      if (error instanceof FormNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
