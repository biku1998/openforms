import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session as GetSession,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaErrorCode } from 'src/shared/errors';
import { UserSession } from 'src/utils/types';
import { FormQuizSettingDto } from '../dtos';
import { FormPresentationSettingDto } from '../dtos/form-presentation-setting.dto';
import { FormResponseSettingDto } from '../dtos/form-response-setting.dto';
import { FormsSettingsService } from '../services';

@Controller({
  version: '1',
  path: 'forms/:id',
})
export class FormsSettingsController {
  constructor(private readonly formsSettingsService: FormsSettingsService) {}

  @Post('quizSettings')
  async createFormQuizSetting(
    @GetSession() session: UserSession,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Body() formQuizSettingDto: FormQuizSettingDto,
  ) {
    try {
      const formQuizSetting =
        await this.formsSettingsService.createFormQuizSetting({
          data: {
            ...formQuizSettingDto,
            form: {
              connect: {
                id,
              },
            },
            createdByUser: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      return formQuizSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RELATION_VIOLATION) {
          throw new BadRequestException('setting already exists');
        }

        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Patch('quizSettings')
  async updateFormQuizSetting(
    @GetSession() session: UserSession,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Body() formQuizSettingDto: FormQuizSettingDto,
  ) {
    try {
      const formQuizSetting =
        await this.formsSettingsService.updateFormQuizSetting({
          where: {
            formId: id,
          },
          data: {
            ...formQuizSettingDto,
            form: {
              connect: {
                id,
              },
            },
            lastUpdatedByUser: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      return formQuizSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Delete('quizSettings')
  async deleteFormQuizSetting(
    @GetSession() session: UserSession,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
  ) {
    try {
      const formQuizSetting =
        await this.formsSettingsService.deleteFormQuizSetting({
          where: {
            formId: id,
          },
          userId: session.user.id,
        });
      return formQuizSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Patch('presentationSettings')
  async updateFormPresentationSetting(
    @GetSession() session: UserSession,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Body() formPresentationSettingDto: FormPresentationSettingDto,
  ) {
    try {
      const formPresentationSetting =
        await this.formsSettingsService.updateFormPresentationSetting({
          where: {
            formId: id,
          },
          data: {
            ...formPresentationSettingDto,
            lastUpdatedByUser: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      return formPresentationSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Patch('responseSettings')
  async updateFormResponseSetting(
    @GetSession() session: UserSession,
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
    @Body() formResponseSettingDto: FormResponseSettingDto,
  ) {
    try {
      const formResponseSetting =
        await this.formsSettingsService.updateFormResponseSetting({
          where: {
            formId: id,
          },
          data: {
            ...formResponseSettingDto,
            lastUpdatedByUser: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      return formResponseSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Get('quizSettings')
  async getFormQuizSetting(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
  ) {
    try {
      const formQuizSetting =
        await this.formsSettingsService.getFormQuizSetting({
          where: {
            formId: id,
          },
        });
      return formQuizSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Get('presentationSettings')
  async getFormPresentationSetting(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
  ) {
    try {
      const formPresentationSetting =
        await this.formsSettingsService.getFormPresentationSetting({
          where: {
            formId: id,
          },
        });
      return formPresentationSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }

  @Get('responseSettings')
  async getResponseSetting(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('id must be a number');
        },
      }),
    )
    id: number,
  ) {
    try {
      const formResponseSetting =
        await this.formsSettingsService.getFormResponseSetting({
          where: {
            formId: id,
          },
        });
      return formResponseSetting;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new NotFoundException('form does not exists');
        }
      }
      throw error;
    }
  }
}
