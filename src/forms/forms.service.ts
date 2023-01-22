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
} from './events';

@Injectable()
export class FormsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createForm({ data }: { data: Prisma.FormCreateInput }): Promise<Form> {
    const newForm = await this.prismaService.form.create({
      data,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_CREATED,
      new FormCreatedEvent({
        form: newForm,
        userId: newForm.created_by_id,
      }),
    );
    return newForm;
  }

  async archiveForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    const deletedForm = await this.prismaService.form.update({
      where,
      data: {
        ...data,
        is_active: false,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_ARCHIVED,
      new FormArchivedEvent({
        id: where.id_created_by_id.id,
        userId: where.id_created_by_id.created_by_id,
      }),
    );

    return deletedForm;
  }

  async publishForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    const publishedForm = await this.prismaService.form.update({
      where,
      data: {
        ...data,
        is_published: true,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_PUBLISHED,
      new FormPublishedEvent({
        id: where.id_created_by_id.id,
        userId: where.id_created_by_id.created_by_id,
      }),
    );

    return publishedForm;
  }

  async unPublishForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    console.log({ data });
    const publishedForm = await this.prismaService.form.update({
      where,
      data: {
        ...data,
        is_published: false,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_UNPUBLISHED,
      new FormUnPublishedEvent({
        id: where.id_created_by_id.id,
        userId: where.id_created_by_id.created_by_id,
      }),
    );

    return publishedForm;
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

  async updateForm(params: {
    where: Prisma.FormWhereUniqueInput;
    data: Prisma.FormUpdateInput;
  }): Promise<Form> {
    const { where, data } = params;
    const updatedForm = await this.prismaService.form.update({
      where,
      data,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_UPDATED,
      new FormUpdatedEvent({
        payload: data,
        id: where.id_created_by_id.id,
        userId: where.id_created_by_id.created_by_id,
      }),
    );
    return updatedForm;
  }

  async restoreForm(params: {
    data: Prisma.FormUpdateInput;
    where: Prisma.FormWhereUniqueInput;
  }): Promise<Form> {
    const { where, data } = params;
    const updatedForm = await this.prismaService.form.update({
      where,
      data: {
        ...data,
        is_active: true,
      },
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_RESTORED,
      new FormRestoredEvent({
        id: where.id_created_by_id.id,
        userId: where.id_created_by_id.created_by_id,
      }),
    );
    return updatedForm;
  }
}
