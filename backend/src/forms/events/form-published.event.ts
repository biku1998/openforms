import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormPublishedEventPayload = {
  id: number;
  userId: number;
};

export class FormPublishedEvent extends BaseEvent {
  private readonly payload: FormPublishedEventPayload;

  constructor(payload: FormPublishedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_PUBLISHED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
