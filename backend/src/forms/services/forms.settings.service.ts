import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  FormPresentationSetting,
  FormQuizSetting,
  FormResponseSetting,
  Prisma,
} from '@prisma/client';
import { AppEventType } from 'src/events/types/events';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FormPresentationSettingUpdatedEvent,
  FormQuizSettingCreatedEvent,
  FormQuizSettingUpdatedEvent,
  FormResponseSettingUpdatedEvent,
  FormQuizSettingDeletedEvent,
} from '../events';

@Injectable()
export class FormsSettingsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createFormQuizSetting({
    data,
  }: {
    data: Prisma.FormQuizSettingCreateInput;
  }): Promise<FormQuizSetting> {
    const formQuizSetting = await this.prismaService.formQuizSetting.create({
      data,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_QUIZ_SETTING_CREATED,
      new FormQuizSettingCreatedEvent({
        formId: data.form.connect.id,
        payload: data,
        userId: data.createdByUser.connect.id,
      }),
    );

    return formQuizSetting;
  }

  async updateFormQuizSetting({
    data,
    where,
  }: {
    data: Prisma.FormQuizSettingUpdateInput;
    where: Prisma.FormQuizSettingWhereUniqueInput;
  }): Promise<FormQuizSetting> {
    const updatedFormQuizSetting =
      await this.prismaService.formQuizSetting.update({
        data,
        where,
      });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_QUIZ_SETTING_UPDATED,
      new FormQuizSettingUpdatedEvent({
        formId: data.form.connect.id,
        payload: data,
        userId: data.createdByUser.connect.id,
      }),
    );

    return updatedFormQuizSetting;
  }

  async deleteFormQuizSetting({
    where,
    userId,
  }: {
    where: Prisma.FormQuizSettingWhereUniqueInput;
    userId: number;
  }) {
    await this.prismaService.formQuizSetting.delete({
      where,
    });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_QUIZ_SETTING_UPDATED,
      new FormQuizSettingDeletedEvent({
        formId: where.formId,
        userId,
      }),
    );
  }

  async updateFormPresentationSetting({
    data,
    where,
  }: {
    data: Prisma.FormPresentationSettingUpdateInput;
    where: Prisma.FormPresentationSettingWhereUniqueInput;
  }): Promise<FormPresentationSetting> {
    const updatedFormPresentationSetting =
      await this.prismaService.formPresentationSetting.update({
        where,
        data,
      });

    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_PRESENTATION_SETTING_UPDATED,
      new FormPresentationSettingUpdatedEvent({
        formId: where.formId,
        payload: data,
        userId: data.lastUpdatedByUser.connect.id,
      }),
    );

    return updatedFormPresentationSetting;
  }

  async updateFormResponseSetting({
    data,
    where,
  }: {
    data: Prisma.FormResponseSettingUpdateInput;
    where: Prisma.FormResponseSettingWhereUniqueInput;
  }): Promise<FormResponseSetting> {
    const updatedFormResponseSetting =
      await this.prismaService.formResponseSetting.update({
        where,
        data,
      });
    // fire events
    this.eventEmitter.emit(
      AppEventType.FORM_RESPONSE_SETTING_UPDATED,
      new FormResponseSettingUpdatedEvent({
        formId: where.formId,
        payload: data,
        userId: data.lastUpdatedByUser.connect.id,
      }),
    );
    return updatedFormResponseSetting;
  }

  async getFormResponseSetting({
    where,
  }: {
    where: Prisma.FormResponseSettingWhereUniqueInput;
  }): Promise<FormResponseSetting> {
    const formResponseSetting =
      await this.prismaService.formResponseSetting.findUnique({
        where,
      });
    return formResponseSetting;
  }

  async getFormPresentationSetting({
    where,
  }: {
    where: Prisma.FormPresentationSettingWhereUniqueInput;
  }): Promise<FormPresentationSetting> {
    const formPresentationSetting =
      await this.prismaService.formPresentationSetting.findUnique({
        where,
      });
    return formPresentationSetting;
  }

  async getFormQuizSetting({
    where,
  }: {
    where: Prisma.FormQuizSettingWhereUniqueInput;
  }): Promise<FormQuizSetting> {
    const formQuizSetting = await this.prismaService.formQuizSetting.findUnique(
      {
        where,
      },
    );
    return formQuizSetting;
  }
}
