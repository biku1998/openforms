import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppEventType } from 'src/events/types/events';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const eventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        UsersModule,
        JwtModule,
        PrismaModule,
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
    })
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .compile();

    const prismaService = module.get<PrismaService>(PrismaService);
    // wipe database before every test
    await prismaService.wipeDatabase();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };
    const user = await service.register(payload);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', payload.email);
    expect(user).toHaveProperty('firstName', payload.firstName);
    expect(user).toHaveProperty('lastName', payload.lastName);
    expect(user.password).not.toBe(payload.password);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.USER_SIGNED_UP,
      {
        eventType: AppEventType.USER_SIGNED_UP,
        payload: {
          payload,
          userId: user.id,
        },
        userId: user.id,
      },
    );
  });

  it('should raise Exception', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };

    await service.register(payload);

    await expect(service.register(payload)).rejects.toThrowError(
      `Email ${payload.email} already registered`,
    );
  });

  it('should login the registered user', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'password',
    };

    await service.register(payload);

    const user = await service.login({
      email: payload.email,
      password: payload.password,
    });

    expect(user).toHaveProperty('email', payload.email);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.USER_LOGGED_IN,
      {
        eventType: AppEventType.USER_LOGGED_IN,
        userId: user.id,
      },
    );
  });

  it('should return null for un-registered user login', async () => {
    const user = await service.login({
      email: 'someEmail@gmail.com',
      password: 'incorrect password here',
    });

    expect(user).toBeNull();
  });
});
