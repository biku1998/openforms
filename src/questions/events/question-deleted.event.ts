import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type QuestionDeletedEventPayload = {
  id: number;
  formId: number;
  userId: number;
};

export class QuestionDeletedEvent extends BaseEvent {
  private readonly payload: QuestionDeletedEventPayload;
  constructor(payload: QuestionDeletedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.QUESTION_DELETED,
    });
    this.payload = payload;
  }
  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
