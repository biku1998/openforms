import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const NODE_ENV = configService.get('NODE_ENV');
    super({
      log:
        NODE_ENV !== 'production'
          ? NODE_ENV === 'test'
            ? []
            : ['warn', 'error', 'query', 'info']
          : [],
    });
  }

  async onModuleInit() {
    let retries = 5;
    const retryDelayInSeconds = 2;

    while (retries > 0) {
      try {
        await this.$connect();
        break;
      } catch (error) {
        console.log(
          `❌ Database connection request failed | retries left (${retries}/5)`,
        );
        console.log(`retrying in ${retryDelayInSeconds} seconds...`);
        retries -= 1;
        await new Promise((res) => setTimeout(res, retryDelayInSeconds * 1000));
      }
    }

    if (retries === 0) {
      process.kill(process.pid, 'SIGKILL');
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async wipeDatabase() {
    if (this.configService.get('NODE_ENV') === 'production') return;

    const tables = Prisma.dmmf.datamodel.models
      .map((model) => model.dbName)
      .filter((table) => table);

    await this.$transaction([
      ...tables.map((table) =>
        this.$executeRawUnsafe(`TRUNCATE ${table} CASCADE;`),
      ),
    ]);
  }
}
