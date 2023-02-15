import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionType } from '../types/question';

type OptionDeletedEventPayload = {
  id: number;
  formId: number;
  questionId: number;
  questionType: QuestionType;
  userId: number;
};

export class OptionDeletedEvent extends BaseEvent {
  private readonly payload: OptionDeletedEventPayload;
  constructor(payload: OptionDeletedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.OPTION_DELETED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
