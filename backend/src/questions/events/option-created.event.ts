import { Prisma } from '@prisma/client';
import _omit from 'lodash/omit';
import BaseEvent from 'src/events/base.event';
import { AppEventType } from 'src/events/types/events';
import { QuestionType } from '../types/question';

type OptionCreatedEventPayload = {
  id: number;
  formId: number;
  questionId: number;
  questionType: QuestionType;
  payload: Pick<
    Prisma.OptionCreateInput,
    'content' | 'position' | 'questionType'
  >;
  userId: number;
};

export class OptionCreatedEvent extends BaseEvent {
  private readonly payload: OptionCreatedEventPayload;
  constructor(payload: OptionCreatedEventPayload) {
    super({
      userId: payload.userId,
      eventType: AppEventType.OPTION_CREATED,
    });
    this.payload = payload;
  }

  getPayload() {
    return _omit(this.payload, ['userId']);
  }
}
