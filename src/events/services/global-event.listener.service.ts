import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import BaseEvent from '../base.event';

@Injectable()
export class GlobalEventListenerService {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('**', { async: true })
  async handleEvent(event: BaseEvent) {
    await this.prismaService.eventLog.create({
      data: {
        context: event.getPayload(),
        user: {
          connect: {
            id: event.getUserId(),
          },
        },
        event_type: {
          connect: {
            name: event.getEventType(),
          },
        },
      },
    });
  }
}
