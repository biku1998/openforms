import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Form, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppEventType } from 'src/events/types/events';
import {
  FormArchivedEvent,
  FormCreatedEvent,
  FormPublishedEvent,
  FormRestoredEvent,
  FormUnPublishedEvent,
  FormUpdatedEvent,
} from '../events';
import { PrismaErrorCode } from 'src/shared/prisma-error-codes';
import { ArchivedFormException, FormNotFoundException } from '../exceptions';

@Injectable()
export class FormsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findOne(params: { id: number; userId?: number }): Promise<Form> {
    const { id, userId } = params;
    const form = await this.prismaService.form.findUnique({
      where: { id },
    });

    if (!form) throw new FormNotFoundException(id);

    if (userId) {
      if (form.createdById !== userId) throw new FormNotFoundException(id);
    }
    return form;
  }

  async getForm(params: {
    id: number;
    userId?: number;
    title?: string;
  }): Promise<Form> {
    const { id, userId, title } = params;
    if (userId || title) {
      const form = await this.prismaService.form.findFirst({
        where: {
          id,
          createdById: userId,
          title,
        },
      });
      if (!form) throw new FormNotFoundException(id);
      return form;
    }

    const form = await this.prismaService.form.findUnique({ where: { id } });
    if (!form) if (!form) throw new FormNotFoundException(id);
    return form;
  }

  async createForm(params: {
    payload: Pick<Prisma.FormCreateInput, 'title' | 'description'>;
    userId: number;
  }): Promise<Form> {
    const { payload, userId } = params;
    const form = await this.prismaService.form.create({
      data: {
        ...payload,
        createdByUser: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_CREATED,
      new FormCreatedEvent({
        form: form,
        userId: form.createdById,
      }),
    );
    return form;
  }

  async archiveForm(params: { id: number; userId: number }): Promise<Form> {
    try {
      const { id, userId } = params;
      const form = await this.prismaService.form.update({
        where: {
          id,
        },
        data: {
          isActive: false,
          lastUpdatedByUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.FORM_ARCHIVED,
        new FormArchivedEvent({
          id,
          userId,
        }),
      );
      return form;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.id);
        }
      }
      throw error;
    }
  }

  async publishForm(params: { id: number; userId: number }): Promise<Form> {
    try {
      const { id, userId } = params;
      const form = await this.prismaService.form.update({
        where: {
          id,
        },
        data: {
          isPublished: true,
          lastUpdatedByUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.FORM_PUBLISHED,
        new FormPublishedEvent({
          id,
          userId,
        }),
      );

      return form;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.id);
        }
      }
      throw error;
    }
  }

  async unPublishForm(params: { id: number; userId: number }): Promise<Form> {
    try {
      const { id, userId } = params;
      const form = await this.prismaService.form.update({
        where: {
          id,
        },
        data: {
          isPublished: false,
          lastUpdatedByUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.FORM_UNPUBLISHED,
        new FormUnPublishedEvent({
          id,
          userId,
        }),
      );

      return form;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.id);
        }
      }
      throw error;
    }
  }

  async getForms(
    params: {
      where?: Prisma.FormWhereInput;
      orderBy?: Prisma.FormOrderByWithRelationInput[];
    } = {},
  ): Promise<Form[]> {
    const { where, orderBy } = params;
    const forms = await this.prismaService.form.findMany({
      where,
      orderBy,
    });

    return forms;
  }

  async getFormById(id: number): Promise<Form> {
    const form = await this.prismaService.form.findUnique({
      where: {
        id,
      },
    });
    if (!form) throw new FormNotFoundException(id);

    if (form.isActive === false) throw new ArchivedFormException(id);
    return form;
  }

  async getFormByIdAndCreator(params: {
    id: number;
    creatorId: number;
  }): Promise<Form> {
    const { id, creatorId } = params;
    const form = await this.prismaService.form.findFirst({
      where: {
        id,
        createdById: creatorId,
      },
    });
    if (!form) throw new FormNotFoundException(id);

    if (form.isActive === false) throw new ArchivedFormException(id);
    return form;
  }

  async updateForm(params: {
    id: number;
    payload: Pick<Prisma.FormUpdateInput, 'title' | 'description'> & {
      headerImgFileUploadId?: number;
    };
    userId: number;
  }): Promise<Form> {
    try {
      const { id, payload, userId } = params;
      const { headerImgFileUploadId, ...updatePayload } = payload;

      if (headerImgFileUploadId) {
        updatePayload['headerImg'] = {
          connect: {
            id: headerImgFileUploadId,
          },
        };
      }

      const form = await this.prismaService.form.update({
        where: {
          id,
        },
        data: {
          ...updatePayload,
          lastUpdatedByUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.FORM_UPDATED,
        new FormUpdatedEvent({
          payload,
          id,
          userId,
        }),
      );
      return form;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.id);
        }
      }
      throw error;
    }
  }

  async restoreForm(params: { id: number; userId: number }): Promise<Form> {
    try {
      const { id, userId } = params;
      const form = await this.prismaService.form.update({
        where: {
          id,
        },
        data: {
          isActive: true,
          lastUpdatedByUser: {
            connect: {
              id: userId,
            },
          },
        },
      });

      // fire events
      this.eventEmitter.emit(
        AppEventType.FORM_RESTORED,
        new FormRestoredEvent({
          id,
          userId,
        }),
      );
      return form;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
          throw new FormNotFoundException(params.id);
        }
      }
      throw error;
    }
  }
}
