import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        PrismaModule,
        EventEmitterModule.forRoot({
          wildcard: true,
          delimiter: '.',
        }),
      ],
    }).compile();

    const prismaService = module.get<PrismaService>(PrismaService);
    // wipe database before every test
    await prismaService.wipeDatabase();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };

    const user = await service.create(payload);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', payload.email);
    expect(user).toHaveProperty('firstName', payload.firstName);
    expect(user).toHaveProperty('lastName', payload.lastName);
  });

  it('should find a user by email', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };

    await service.create(payload);

    const user = await service.findByEmail(payload.email);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', payload.email);
  });

  it('should return null for un-registered email', async () => {
    const user = await service.findByEmail('abc@gmail.com');

    expect(user).toBeNull();
  });

  it('should find a user by id', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };

    const newUser = await service.create(payload);
    const user = await service.findById(newUser.id);

    expect(user).toBeDefined();
    expect(user).toHaveProperty('id', newUser.id);
  });

  it('should return null for un-registered user', async () => {
    const user = await service.findById(1099);

    expect(user).toBeNull();
  });
});
