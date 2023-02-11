import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {
    super();
  }

  async pingCheck(cacheName: string) {
    await this.cacheManager.set('key', 'value');
    const value = await this.cacheManager.get('key');

    if (value !== 'value')
      throw new InternalServerErrorException('Cache not working');

    await this.cacheManager.del('key');

    return this.getStatus(cacheName, true);
  }
}
