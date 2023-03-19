import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Form as FormModel } from '@prisma/client';
import { ItemState, RequestWithUser } from 'src/utils/types';
import { CreateFormDto, UpdateFormDto } from '../dtos';
import { FormNotFoundException } from '../exceptions';
import { FormsService } from '../services';

@Controller({
  version: '1',
  path: 'forms',
})
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Get()
  async getForms(
    @Req() req: RequestWithUser,
    @Query('state', new DefaultValuePipe(ItemState.active)) state?: string,
    @Query('published', new DefaultValuePipe(false))
    @Query('searchString')
    searchString?: string,
    @Query('sort') sort?: string,
  ): Promise<FormModel[]> {
    if (Object.keys(ItemState).includes(state) === false) {
      throw new BadRequestException('invalid form state');
    }

    try {
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

      const forms = await this.formService.findMany({
        userId: req.user.id,
        isActive: state === 'active',
        orderBy,
      });
      return forms;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async updateForm(
    @Req() req: RequestWithUser,
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
      const updatedForm = await this.formService.update({
        id,
        payload: updateFormDto,
        userId: req.user.id,
      });
      return updatedForm;
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post()
  async createForm(
    @Req() req: RequestWithUser,
    @Body() createFormDto: CreateFormDto,
  ): Promise<FormModel> {
    try {
      const form = await this.formService.create({
        payload: createFormDto,
        userId: req.user.id,
      });

      return form;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id/archive')
  async archiveForm(
    @Req() req: RequestWithUser,
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
      await this.formService.archive({
        id,
        userId: req.user.id,
      });
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id/publish')
  async publishForm(
    @Req() req: RequestWithUser,
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
      await this.formService.publish({
        id,
        userId: req.user.id,
      });
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id/publish')
  async unPublishForm(
    @Req() req: RequestWithUser,
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
      await this.formService.unPublish({
        id,
        userId: req.user.id,
      });
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id/restore')
  async restoreForm(
    @Req() req: RequestWithUser,
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
      await this.formService.restore({
        id,
        userId: req.user.id,
      });
    } catch (error) {
      if (error instanceof FormNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
