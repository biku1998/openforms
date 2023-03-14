import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { AppEventType } from 'src/events/types/events';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/services';
import { UsersModule } from 'src/users/users.module';
import { FormNotFoundException } from '../exceptions';
import { FormsService } from './forms.service';

describe('FormsService', () => {
  let service: FormsService;
  let userId: number;

  const eventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsService],
      imports: [
        PrismaModule,
        UsersModule,
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

    const userPayload = {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: '',
      email: 'john123@gmail.com',
      password: 'john_secret_password',
    };

    const usersService = await module.get<UsersService>(UsersService);
    const user = await usersService.create(userPayload);
    userId = user.id;

    service = module.get<FormsService>(FormsService);
  });

  it('should create a form in draft mode', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    const form = await service.createForm({ payload, userId });

    expect(form).toHaveProperty('id');
    expect(form).toHaveProperty('title', payload.title);
    expect(form).toHaveProperty('description', payload.description);
    expect(form).toHaveProperty('isActive', true);
    expect(form).toHaveProperty('isPublished', false);

    expect(eventEmitter.emit).toHaveBeenCalledWith(AppEventType.FORM_CREATED, {
      eventType: AppEventType.FORM_CREATED,
      payload: {
        form,
        userId,
      },
      userId,
    });
  });

  it('should publish a form with given id', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };
    const form = await service.createForm({ payload, userId });

    const publishedForm = await service.publishForm({
      id: form.id,
      userId,
    });

    expect(publishedForm).toHaveProperty('isPublished', true);

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.FORM_PUBLISHED,
      {
        eventType: AppEventType.FORM_PUBLISHED,
        payload: {
          id: publishedForm.id,
          userId,
        },
        userId,
      },
    );
  });

  it('should throw an exception if we are try to publish form that does not exists', async () => {
    await expect(
      service.publishForm({
        id: 101,
        userId,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should un-publish a form with given id', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
      isPublished: true,
    };
    const form = await service.createForm({ payload, userId });

    const unPublishedForm = await service.unPublishForm({
      id: form.id,
      userId,
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      AppEventType.FORM_UNPUBLISHED,
      {
        eventType: AppEventType.FORM_UNPUBLISHED,
        payload: {
          id: unPublishedForm.id,
          userId,
        },
        userId,
      },
    );
  });

  it('should throw an exception if we are try to un-publish form that does not exists', async () => {
    await expect(
      service.unPublishForm({
        id: 101,
        userId,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should update a form with given id and payload', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    const form = await service.createForm({ payload, userId });

    const updatedForm = await service.updateForm({
      id: form.id,
      userId,
      payload: {
        title: 'data science workshop feedback',
      },
    });

    expect(updatedForm).toHaveProperty(
      'title',
      'data science workshop feedback',
    );

    expect(eventEmitter.emit).toHaveBeenCalledWith(AppEventType.FORM_UPDATED, {
      eventType: AppEventType.FORM_UPDATED,
      payload: {
        id: updatedForm.id,
        payload: {
          title: 'data science workshop feedback',
        },
        userId,
      },
      userId,
    });
  });

  it('should throw an exception if we are try to update form that does not exists', async () => {
    await expect(
      service.updateForm({
        id: 101,
        userId,
        payload: {
          title: 'updated title',
        },
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should archive a form with given id', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    const form = await service.createForm({ payload, userId });

    const archivedForm = await service.archiveForm({
      id: form.id,
      userId,
    });

    expect(archivedForm).toHaveProperty('isActive', false);

    expect(eventEmitter.emit).toHaveBeenCalledWith(AppEventType.FORM_ARCHIVED, {
      eventType: AppEventType.FORM_ARCHIVED,
      payload: {
        id: archivedForm.id,
        userId,
      },
      userId,
    });
  });

  it('should throw an exception if we are try to archive form that does not exists', async () => {
    await expect(
      service.archiveForm({
        id: 1011,
        userId,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should restore an archived form with given id', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    const form = await service.createForm({ payload, userId });

    const archivedForm = await service.archiveForm({
      id: form.id,
      userId,
    });

    const restoredForm = await service.restoreForm({
      id: archivedForm.id,
      userId,
    });

    expect(restoredForm).toHaveProperty('isActive', true);

    expect(eventEmitter.emit).toHaveBeenCalledWith(AppEventType.FORM_RESTORED, {
      eventType: AppEventType.FORM_RESTORED,
      payload: {
        id: archivedForm.id,
        userId,
      },
      userId,
    });
  });

  it('should throw an exception if we are try to restore an archived form that does not exists', async () => {
    await expect(
      service.restoreForm({
        id: 1011,
        userId,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should get a form with id', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });
    const form = await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });

    const fetchedForm = await service.findOne({
      id: form.id,
    });

    expect(fetchedForm).toHaveProperty('id', form.id);
    expect(fetchedForm).toHaveProperty('title', form.title);
  });

  it('should throw an exception if form does not exists', async () => {
    await expect(
      service.findOne({
        id: 1011,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it('should throw an exception if form creator is someone else', async () => {
    const payload = {
      title: 'workshop feedback',
      description: 'collecting feedback for the data science live workshop',
    };

    await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });
    const form = await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });
    await service.createForm({ payload, userId });

    await expect(
      service.findOne({
        id: form.id,
        userId: 100,
      }),
    ).rejects.toThrow(FormNotFoundException);
  });

  it.todo('should get forms with state filter');

  it.todo('should get forms with matching title filter');

  it.todo('should get forms sorted with createdAt in asc order');

  it.todo('should get forms sorted with createdAt in desc order');
});
