import { Injectable } from '@nestjs/common';
import { EventType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEventType({
    data,
  }: {
    data: Prisma.EventTypeCreateInput;
  }): Promise<EventType> {
    const eventType = await this.prismaService.eventType.create({
      data,
    });
    return eventType;
  }

  async getEventTypeByName(name: string): Promise<EventType> {
    const eventType = await this.prismaService.eventType.findUnique({
      where: {
        name,
      },
    });
    return eventType;
  }
}
