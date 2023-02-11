import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionCreateInput } from '../types/question';

type QuestionCreatedEventPayload = {
  id: number;
  formId: number;
  payload: QuestionCreateInput;
  userId: number;
};

export class QuestionCreatedEvent extends BaseEvent {
  private readonly payload: QuestionCreatedEventPayload;
  constructor(payload: QuestionCreatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.QUESTION_CREATED,
    });
    this.payload = payload;
  }
  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
