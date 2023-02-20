import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionType } from '../types/question';

type OptionArchivedEventPayload = {
  id: number;
  formId: number;
  questionId: number;
  questionType: QuestionType;
  userId: number;
};

export class OptionArchivedEvent extends BaseEvent {
  private readonly payload: OptionArchivedEventPayload;
  constructor(payload: OptionArchivedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.OPTION_ARCHIVED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
