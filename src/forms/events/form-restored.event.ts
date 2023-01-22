import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormRestoredEventPayload = {
  id: number;
  userId: number;
};

export class FormRestoredEvent extends BaseEvent {
  private readonly payload: FormRestoredEventPayload;

  constructor(payload: FormRestoredEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_RESTORED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
