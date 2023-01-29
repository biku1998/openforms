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

@Injectable()
export class FormsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createForm({ data }: { data: Prisma.FormCreateInput }): Promise<Form> {
    const form = await this.prismaService.form.create({
      data,
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

  async archiveForm(params: {
    where: Prisma.FormWhereUniqueInput;
    userId: number;
  }): Promise<Form> {
    const { where, userId } = params;
    const form = await this.prismaService.form.update({
      where,
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
        id: where.id,
        userId,
      }),
    );

    return form;
  }

  async publishForm(params: {
    where: Prisma.FormWhereUniqueInput;
    userId: number;
  }): Promise<Form> {
    const { where, userId } = params;
    const form = await this.prismaService.form.update({
      where,
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
        id: where.id,
        userId,
      }),
    );

    return form;
  }

  async unPublishForm(params: {
    where: Prisma.FormWhereUniqueInput;
    userId: number;
  }): Promise<Form> {
    const { where, userId } = params;
    const form = await this.prismaService.form.update({
      where,
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
        id: where.id,
        userId,
      }),
    );

    return form;
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
    return form;
  }

  async updateForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    const form = await this.prismaService.form.update({
      where,
      data,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_UPDATED,
      new FormUpdatedEvent({
        payload: data,
        id: where.id,
        userId: data.lastUpdatedByUser.connect.id,
      }),
    );
    return form;
  }

  async restoreForm(params: {
    where: Prisma.FormWhereUniqueInput;
    userId: number;
  }): Promise<Form> {
    const { where, userId } = params;
    const form = await this.prismaService.form.update({
      where,
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
        id: where.id,
        userId,
      }),
    );
    return form;
  }
}
