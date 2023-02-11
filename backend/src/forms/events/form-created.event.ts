import { Form } from '@prisma/client';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormCreatedEventPayload = {
  form: Form;
  userId: number;
};

export class FormCreatedEvent extends BaseEvent {
  private readonly payload: FormCreatedEventPayload;

  constructor(payload: FormCreatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_CREATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return this.payload.form;
  }
}
