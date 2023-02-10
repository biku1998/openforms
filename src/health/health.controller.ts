import { Controller, Get, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Public } from 'src/utils/public.decorator';
import { PrismaHealthIndicator } from './prisma.health.indicator';
import { RedisHealthIndicator } from './redis.health.indicator';

@Controller('_health')
export class HealthController {
  constructor(
    private configService: ConfigService,
    private healthCheckService: HealthCheckService,
    private httpHealthIndicator: HttpHealthIndicator,
    private prismaHealthIndicator: PrismaHealthIndicator,
    private redisHealthIndicator: RedisHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Public()
  @Version('1')
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'basic running check',
          `http://localhost:${this.configService.get('PORT_API')}`,
        ),
      () =>
        this.disk.checkStorage('disk health', {
          thresholdPercent: 0.7,
          path: '/',
        }),
      () => this.prismaHealthIndicator.pingCheck('postgres'),
      () => this.redisHealthIndicator.pingCheck('redis'),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }
}
