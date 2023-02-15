import { Injectable } from '@nestjs/common';
import { Option, Prisma } from '@prisma/client';
import { FormsService } from 'src/forms/services';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionType } from '../types/question';
import { QuestionsService } from './questions.service';

@Injectable()
export class OptionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly questionService: QuestionsService,
    private readonly formService: FormsService,
  ) {}

  async createOption(params: {
    formId: number;
    questionId: number;
    questionType: QuestionType;
    data: Prisma.OptionCreateInput;
    userId: number;
  }): Promise<Option> {
    try {
      const { formId, questionId, data, userId, questionType } = params;
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

      // create option
      const option = await this.prismaService.option.create({ data });
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

      // create option
      const option = await this.prismaService.option.update({
        where: { id },
        data,
      });
      return option;
    } catch (error) {
      throw error;
    }
  }

  async deleteOption() {}
}
