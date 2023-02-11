import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionUpdateInput } from '../types/question';

type QuestionUpdatedEventPayload = {
  id: number;
  formId: number;
  payload: QuestionUpdateInput;
  userId: number;
};

export class QuestionUpdatedEvent extends BaseEvent {
  private readonly payload: QuestionUpdatedEventPayload;
  constructor(payload: QuestionUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.QUESTION_UPDATED,
    });
    this.payload = payload;
  }
  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
