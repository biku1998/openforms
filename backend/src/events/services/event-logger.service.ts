import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventLoggerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEventLog({ data }: { data: Prisma.EventLogCreateInput }) {
    const log = await this.prismaService.eventLog.create({
      data,
    });
    return log;
  }
}
