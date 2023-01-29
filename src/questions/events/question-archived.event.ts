import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';

type QuestionArchivedEventPayload = {
  id: number;
  formId: number;
  userId: number;
};

export class QuestionArchivedEvent extends BaseEvent {
  private readonly payload: QuestionArchivedEventPayload;
  constructor(payload: QuestionArchivedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.QUESTION_ARCHIVED,
    });
    this.payload = payload;
  }
  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
