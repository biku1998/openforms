import { Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionType } from '../types/question';

type OptionUpdatedEventPayload = {
  id: number;
  formId: number;
  questionId: number;
  questionType: QuestionType;
  payload: Prisma.OptionUpdateInput;
  userId: number;
};

export class OptionUpdatedEvent extends BaseEvent {
  private readonly payload: OptionUpdatedEventPayload;
  constructor(payload: OptionUpdatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.OPTION_UPDATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
