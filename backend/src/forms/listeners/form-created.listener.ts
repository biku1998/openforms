import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppEventType } from 'src/events/types/events';
import { PrismaService } from 'src/prisma/prisma.service';
import { FormCreatedEvent } from '../events';

@Injectable()
export class FormCreatedListener {
  constructor(private readonly prismaService: PrismaService) {}
  @OnEvent(AppEventType.FORM_CREATED)
  async handleFormCreatedEvent(event: FormCreatedEvent) {
    // we need to create response and presentation settings for the newly created form
    const { id } = event.getPayload();
    await this.prismaService.formResponseSetting.create({
      data: {
        form: {
          connect: {
            id,
          },
        },
        createdByUser: {
          connect: {
            id: event.getUserId(),
          },
        },
      },
    });

    await this.prismaService.formPresentationSetting.create({
      data: {
        form: {
          connect: {
            id,
          },
        },
        createdByUser: {
          connect: {
            id: event.getUserId(),
          },
        },
      },
    });
  }
}
