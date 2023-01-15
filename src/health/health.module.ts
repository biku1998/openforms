import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma.health.indicator';
import { RedisHealthIndicator } from './redis.health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  exports: [PrismaHealthIndicator, RedisHealthIndicator],
  providers: [PrismaHealthIndicator, RedisHealthIndicator],
})
export class HealthModule {}
