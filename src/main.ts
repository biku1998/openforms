import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis'; // new code
import IoRedis from 'ioredis';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SessionGuard } from './auth/guards/session.guard';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // enable global request validation
  app.useGlobalPipes(new ValidationPipe());

  // enable helmet
  app.use(helmet());

  // some prisma relate stuff
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const configService: ConfigService = app.get(ConfigService);

  // init redis
  const RedisStore = connectRedis(session);
  const redisClient = new IoRedis(configService.get<string>('REDIS_URL'));

  // configure session storage
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get<string>('SESSION_SIGN_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: configService.get<string>('NODE_ENV') === 'production',
        maxAge: 1 * 86400000, // (no of day) * milliseconds
      },
    }),
  );

  // configure versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // add global guards
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new SessionGuard(reflector));

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
