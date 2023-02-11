import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async pingCheck(databaseName: string) {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus(databaseName, true);
    } catch (e) {
      throw new InternalServerErrorException('Prisma check failed', e);
    }
  }
}
