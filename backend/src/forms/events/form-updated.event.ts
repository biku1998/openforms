import { Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormUpdatedEventPayload = {
  payload: Prisma.FormUpdateInput;
  id: number;
  userId: number;
};

export class FormUpdatedEvent extends BaseEvent {
  private readonly payload: FormUpdatedEventPayload;

  constructor(payload: FormUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_UPDATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
