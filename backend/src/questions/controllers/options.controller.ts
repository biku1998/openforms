import {
  Controller,
  Param,
  Post,
  ParseIntPipe,
  BadRequestException,
  Body,
  Patch,
  Delete,
  NotFoundException,
  Query,
  ParseEnumPipe,
  Req,
} from '@nestjs/common';
import { FormNotFoundException } from 'src/forms/exceptions';
import { RequestWithUser } from 'src/utils/types';
import { CreateOptionDto } from '../dtos/create-option.dto';
import { UpdateOptionDto } from '../dtos/update-option.dto';
import { FormQuestionNotFoundException } from '../exceptions';
import { OptionNotFoundException } from '../exceptions/option.exception';
import { OptionsService } from '../services/options.service';
import { QuestionType } from '../types/question';

@Controller('forms/:formId/questions/:questionId/options')
export class OptionsController {
  constructor(private readonly optionService: OptionsService) {}

  // @Post()
  // async createOption(
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
  //     'questionId',
  //     new ParseIntPipe({
  //       exceptionFactory: () => {
  //         throw new BadRequestException('questionId must be a number');
  //       },
  //     }),
  //   )
  //   questionId: number,
  //   @Body() createOptionDto: CreateOptionDto,
  // ) {
  //   try {
  //     const option = await this.optionService.createOption({
  //       formId,
  //       questionId,
  //       userId: req.user.id,
  //       data: {
  //         createdByUser: {
  //           connect: {
  //             id: req.user.id,
  //           },
  //         },
  //         questionId,
  //         ...createOptionDto,
  //       },
  //     });

  //     return option;
  //   } catch (error) {
  //     if (error instanceof FormNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     if (error instanceof FormQuestionNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }

  // @Patch(':id')
  // async updateOption(
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
  //     'questionId',
  //     new ParseIntPipe({
  //       exceptionFactory: () => {
  //         throw new BadRequestException('questionId must be a number');
  //       },
  //     }),
  //   )
  //   questionId: number,
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
  //     'questionType',
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
  //   @Body() updateOptionDto: UpdateOptionDto,
  // ) {
  //   try {
  //     const option = await this.optionService.updateOption({
  //       formId,
  //       id,
  //       questionId,
  //       questionType,
  //       userId: req.user.id,
  //       data: {
  //         ...updateOptionDto,
  //         lastUpdatedByUser: {
  //           connect: {
  //             id: req.user.id,
  //           },
  //         },
  //       },
  //     });
  //     return option;
  //   } catch (error) {
  //     if (error instanceof FormNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     if (error instanceof FormQuestionNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     if (error instanceof OptionNotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }

  // @Delete(':id/archive')
  // async archiveOption() {}

  // @Patch(':id/restore')
  // async restoreOption() {}

  // @Delete(':id')
  // async deleteOption() {}
}
