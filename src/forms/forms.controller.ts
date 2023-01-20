import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session as GetSession,
} from '@nestjs/common';
import { Form as FormModel, Prisma } from '@prisma/client';
import { ItemState, UserSession } from 'src/utils/types';
import { CreateFormDto } from './dtos/create-form.dto';
import { UpdateFormDto } from './dtos/update-form.dto';
import { FormsService } from './forms.service';

@Controller({
  version: '1',
  path: 'forms',
})
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Get()
  async getForms(
    @GetSession() session: UserSession,
    @Query('state', new DefaultValuePipe(ItemState.active)) state?: string,
    @Query('search_string') searchString?: string,
    @Query('sort') sort?: string,
  ): Promise<FormModel[]> {
    if (Object.keys(ItemState).includes(state) === false) {
      throw new BadRequestException('invalid form state');
    }

    try {
      // construct title, description search condition
      const or = searchString
        ? {
            OR: [
              { title: { contains: searchString } },
              { description: { contains: searchString } },
            ],
          }
        : {};

      // construct sort condition
      const orderBy = [];

      if (sort) {
        const sortAttributes = sort.split(',');
        for (const sortAttribute of sortAttributes) {
          if (sortAttribute.includes('-'))
            orderBy.push({
              [sortAttribute.split('-')[1]]: 'desc',
            });
          else
            orderBy.push({
              [sortAttribute]: 'asc',
            });
        }
      }

      const forms = await this.formService.getForms({
        where: {
          created_by_id: session.user.userId,
          is_active: state === 'active',
          ...or,
        },
        orderBy,
      });
      return forms;
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   console.log(error.code);
      // }
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }

  @Patch(':id')
  async updateForm(
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
    @Body() updateFormDto: UpdateFormDto,
  ): Promise<FormModel> {
    try {
      const updatedForm = await this.formService.updateForm({
        where: {
          id_created_by_id: {
            id,
            created_by_id: session.user.userId,
          },
        },
        data: {
          ...updateFormDto,
          last_updated_by_user: {
            connect: {
              id: session.user.userId,
            },
          },
        },
      });
      return updatedForm;
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

  @Post()
  async createForm(
    @GetSession() session: UserSession,
    @Body() createFormDto: CreateFormDto,
  ): Promise<FormModel> {
    try {
      const form = await this.formService.createForm({
        data: {
          ...createFormDto,
          created_by_user: {
            connect: {
              id: session.user.userId,
            },
          },
        },
      });

      return form;
    } catch (error) {
      throw new InternalServerErrorException(
        'Oops! Something went really wrong',
      );
    }
  }

  @Delete(':id/archive')
  async archiveForm(
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
      await this.formService.archiveForm({
        where: {
          id_created_by_id: {
            id,
            created_by_id: session.user.userId,
          },
        },
        data: {
          last_updated_by_user: {
            connect: {
              id: session.user.userId,
            },
          },
        },
      });
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

  @Patch(':id/publish')
  async publishForm(
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
      await this.formService.publishForm({
        where: {
          id_created_by_id: {
            id,
            created_by_id: session.user.userId,
          },
        },
        data: {
          last_updated_by_user: {
            connect: {
              id: session.user.userId,
            },
          },
        },
      });
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

  @Delete(':id/publish')
  async unPublishForm(
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
      await this.formService.unPublishForm({
        where: {
          id_created_by_id: {
            id,
            created_by_id: session.user.userId,
          },
        },
        data: {
          last_updated_by_user: {
            connect: {
              id: session.user.userId,
            },
          },
        },
      });
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
