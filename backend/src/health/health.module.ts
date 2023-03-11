import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma.health.indicator';

@Module({
  imports: [TerminusModule, ConfigModule],
  controllers: [HealthController],
  exports: [PrismaHealthIndicator],
  providers: [PrismaHealthIndicator],
})
export class HealthModule {}
