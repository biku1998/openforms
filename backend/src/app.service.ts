import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppEventType } from './events/types/events';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async seedEventTypesToDatabase() {
    try {
      const eventTypes = await this.prismaService.eventType.findMany({
        select: {
          name: true,
        },
      });
      const data = Object.values(AppEventType)
        .filter(
          (aet) => eventTypes.map((et) => et.name).includes(aet) === false,
        )
        .map((aet) => ({
          name: aet,
        }));

      await this.prismaService.eventType.createMany({ data });
    } catch (error) {
      console.log(
        '❌ Something went wrong in seeding event types to database...',
      );
    }
  }

  onModuleInit() {
    this.seedEventTypesToDatabase();
  }
}
