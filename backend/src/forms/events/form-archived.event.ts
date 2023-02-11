import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type FormArchivedEventPayload = {
  id: number;
  userId: number;
};

export class FormArchivedEvent extends BaseEvent {
  private readonly payload: FormArchivedEventPayload;

  constructor(payload: FormArchivedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.FORM_ARCHIVED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
