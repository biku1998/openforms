import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type QuestionRestoredEventPayload = {
  id: number;
  formId: number;
  userId: number;
};

export class QuestionRestoredEvent extends BaseEvent {
  private readonly payload: QuestionRestoredEventPayload;
  constructor(payload: QuestionRestoredEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.QUESTION_RESTORED,
    });
    this.payload = payload;
  }
  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
