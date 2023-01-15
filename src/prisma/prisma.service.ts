import {
  INestApplication,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    let retries = 5;
    while (retries > 0) {
      try {
        await this.$connect();
        break;
      } catch (error) {
        console.log(
          `❌ Database connection request failed | retries left (${retries}/5)`,
        );
        console.log('retrying in 5 seconds...');
        retries -= 1;
        await new Promise((res) => setTimeout(res, 5000));
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
}
