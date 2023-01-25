import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session as GetSession,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserSession } from 'src/utils/types';
import { FormQuizSettingDto } from '../dtos';
import { FormsSettingsService } from '../services';

@Controller({
  version: '1',
  path: 'forms/:id',
})
export class FormsSettingsController {
  constructor(private readonly formsSettingsService: FormsSettingsService) {}

  @Post('quiz_settings')
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
        if (error.code === 'P2014') {
          throw new BadRequestException('setting already exists');
        }

        if (error.code === 'P2025') {
          throw new NotFoundException('form does not exists');
        }
      }
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }

  @Patch('quiz_settings')
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
        if (error.code === 'P2025') {
          throw new NotFoundException('form does not exists');
        }
      }
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }

  @Delete('quiz_settings')
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
        if (error.code === 'P2025') {
          throw new NotFoundException('form does not exists');
        }
      }
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }
}
