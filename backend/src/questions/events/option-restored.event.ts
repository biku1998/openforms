import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionType } from '../types/question';

type OptionRestoredEventPayload = {
  id: number;
  formId: number;
  questionId: number;
  questionType: QuestionType;
  userId: number;
};

export class OptionRestoredEvent extends BaseEvent {
  private readonly payload: OptionRestoredEventPayload;
  constructor(payload: OptionRestoredEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.OPTION_RESTORED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
