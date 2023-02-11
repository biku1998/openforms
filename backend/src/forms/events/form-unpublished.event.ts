import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormUnPublishedEventPayload = {
  id: number;
  userId: number;
};

export class FormUnPublishedEvent extends BaseEvent {
  private readonly payload: FormUnPublishedEventPayload;

  constructor(payload: FormUnPublishedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_UNPUBLISHED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
